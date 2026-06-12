"use client";

/**
 * app/races/page.tsx — レース一覧ページ
 * 既存のレース一覧ダッシュボードを /races に移設
 * - APIから実データ取得
 * - data_source="fallback" の場合: 天候等 null→「準備中」、予測0.35固定→「検証中」表示
 * - 固定値判定ロジック必須 (it-consultant-result.md §1-2 実測値に基づく)
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { VerificationBadge } from "@/components/VerificationBadge";
import { RaceCard, RaceCardSkeleton, Race } from "@/components/RaceCard";
import { Footer } from "@/components/Footer";
import {
  trackViewRaceList,
  trackApiError,
  trackDataFreshnessIssue,
} from "@/lib/analytics";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://sxhxd2rkyl.execute-api.ap-northeast-1.amazonaws.com/prod";

// 環境変数で現在のデータフェーズを管理 (デザイナー §5-4)
// NEXT_PUBLIC_DATA_PHASE=1 (実在レース・静的気象) / 2 (天候リアルタイム) / 3 (AI予想配信)
const DATA_PHASE = parseInt(process.env.NEXT_PUBLIC_DATA_PHASE ?? "1", 10);

const PHASE_LABEL: Record<number, string> = {
  1: "今日の開催レース",
  2: "今日の開催レース（天候リアルタイム）",
  3: "今日のAI予想",
};

type FilterStatus = "all" | "selling" | "upcoming" | "closed" | "confirmed";

/** JST 日付タブ生成 (前後3日) */
function getDateTabs(): { date: string; label: string; dayLabel: string }[] {
  const jst = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
  };
  const isoJST = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, "-");
  };

  return [-3, -2, -1, 0, 1, 2, 3].map((offset) => {
    const raw = jst(offset);
    const parts = raw.split(" ");
    const dayLabel =
      offset === 0 ? "今日" : offset === -1 ? "昨日" : offset === 1 ? "明日" : "";
    return {
      date: isoJST(offset),
      label: parts[0] ?? raw,
      dayLabel,
    };
  });
}

export default function RacesPage() {
  const tabs = getDateTabs();
  const todayIdx = 3; // 配列中心 = today
  const [selectedDate, setSelectedDate] = useState<string>(tabs[todayIdx].date);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>("unknown");

  const fetchRaces = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/races?date=${date}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        trackApiError({
          endpoint: `/api/races?date=${date}`,
          status_code: res.status,
          error_message: `HTTP ${res.status}`,
        });
        throw new Error(`APIエラー (${res.status})`);
      }
      const data = await res.json();
      const list: Race[] = Array.isArray(data) ? data : (data.races ?? []);
      const source: string = data.data_source ?? "unknown";
      const at: string | null = data.fetched_at ?? data.created_at ?? null;

      setRaces(list);
      setDataSource(source);
      setFetchedAt(at);

      // GA4: レース一覧表示
      trackViewRaceList({
        date,
        races_count: list.length,
        has_predictions: list.some(
          (r) => r.top_pick !== null && r.top_predicted_win !== 0.35
        ),
      });

      // データ鮮度チェック (最終更新から30分超)
      if (at) {
        const ageMinutes = (Date.now() - new Date(at).getTime()) / 60000;
        if (ageMinutes > 30) {
          trackDataFreshnessIssue({
            issue_type: "stale_weather",
            age_minutes: Math.round(ageMinutes),
          });
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "データ取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRaces(selectedDate);
  }, [selectedDate, fetchRaces]);

  const filteredRaces = races.filter(
    (r) => filter === "all" || r.status === filter
  );

  const formatFetchedAt = (iso: string | null) => {
    if (!iso) return "--:--";
    try {
      return new Date(iso).toLocaleTimeString("ja-JP", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "--:--";
    }
  };

  return (
    <>
      {/* ナビゲーション */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "var(--nav-height)",
          background: "var(--color-bg-overlay)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border-default)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--text-lg)",
              color: "var(--color-text-primary)",
              textDecoration: "none",
            }}
          >
            <span aria-hidden="true">⛵</span>
            <span>艇王</span>
          </Link>

          {/* フェーズ表示 */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              {PHASE_LABEL[DATA_PHASE] ?? "今日の開催レース"}
            </span>
            {/* data_source=fallback の場合は警告表示 */}
            {dataSource === "fallback" && (
              <VerificationBadge variant="preparing" size="sm" />
            )}
          </div>
        </div>
      </header>

      <main style={{ minHeight: "calc(100vh - var(--nav-height))" }}>
        <div className="container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}>

          {/* 日付タブ */}
          <div
            role="tablist"
            aria-label="日付選択"
            style={{
              display: "flex",
              gap: "var(--space-2)",
              overflowX: "auto",
              paddingBottom: "var(--space-2)",
              marginBottom: "var(--space-6)",
              scrollbarWidth: "none",
            }}
          >
            {tabs.map(({ date, label, dayLabel }) => {
              const isSelected = date === selectedDate;
              return (
                <button
                  key={date}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedDate(date)}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "var(--space-2) var(--space-4)",
                    borderRadius: "var(--radius-md)",
                    border: isSelected
                      ? "1px solid var(--color-teal-500)"
                      : "1px solid var(--color-border-default)",
                    background: isSelected
                      ? "rgba(0,201,184,0.1)"
                      : "var(--color-bg-card)",
                    color: isSelected
                      ? "var(--color-teal-500)"
                      : "var(--color-text-secondary)",
                    cursor: "pointer",
                    transition: "all var(--duration-fast)",
                    fontSize: "var(--text-sm)",
                    fontWeight: isSelected
                      ? "var(--font-weight-semibold)"
                      : "var(--font-weight-normal)",
                    minWidth: "64px",
                  }}
                >
                  {dayLabel && (
                    <span style={{ fontSize: "var(--text-xs)" }}>{dayLabel}</span>
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* フィルタ + 更新ボタン */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              marginBottom: "var(--space-6)",
            }}
          >
            <div
              role="group"
              aria-label="ステータスフィルタ"
              style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}
            >
              {(
                [
                  { value: "all", label: "すべて" },
                  { value: "selling", label: "発売中" },
                  { value: "upcoming", label: "発売前" },
                  { value: "closed", label: "締切" },
                  { value: "confirmed", label: "確定" },
                ] as { value: FilterStatus; label: string }[]
              ).map(({ value, label }) => {
                const isActive = filter === value;
                return (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    aria-pressed={isActive}
                    style={{
                      padding: "var(--space-1) var(--space-4)",
                      borderRadius: "var(--radius-full)",
                      border: isActive
                        ? "1px solid var(--color-teal-500)"
                        : "1px solid var(--color-border-default)",
                      background: isActive
                        ? "rgba(0,201,184,0.1)"
                        : "transparent",
                      color: isActive
                        ? "var(--color-teal-500)"
                        : "var(--color-text-secondary)",
                      cursor: "pointer",
                      fontSize: "var(--text-sm)",
                      transition: "all var(--duration-fast)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              {fetchedAt && (
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                  最終更新 {formatFetchedAt(fetchedAt)}
                </span>
              )}
              <button
                onClick={() => fetchRaces(selectedDate)}
                disabled={loading}
                aria-label="データを更新"
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-default)",
                  background: "var(--color-bg-card)",
                  color: "var(--color-text-secondary)",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "var(--text-sm)",
                  opacity: loading ? 0.5 : 1,
                  transition: "all var(--duration-fast)",
                }}
              >
                ↻ 更新
              </button>
            </div>
          </div>

          {/* data_source=fallback の通知バナー */}
          {dataSource === "fallback" && (
            <div
              role="alert"
              style={{
                background: "var(--color-warning-bg)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-3) var(--space-4)",
                marginBottom: "var(--space-6)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
              }}
            >
              <VerificationBadge variant="validating" size="sm" />
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                現在、リアルタイムデータを準備中です。天候・AI予想は順次公開予定です。
              </p>
            </div>
          )}

          {/* エラー表示 */}
          {error && (
            <div
              role="alert"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-4)",
                marginBottom: "var(--space-6)",
                textAlign: "center",
              }}
            >
              <p style={{ color: "var(--color-error)", fontSize: "var(--text-sm)" }}>
                データの取得に失敗しました: {error}
              </p>
              <button
                onClick={() => fetchRaces(selectedDate)}
                style={{
                  marginTop: "var(--space-3)",
                  padding: "var(--space-2) var(--space-6)",
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-cta-primary)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "var(--text-sm)",
                  border: "none",
                }}
              >
                再試行
              </button>
            </div>
          )}

          {/* レースカードグリッド */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <RaceCardSkeleton key={i} />
                ))
              : filteredRaces.length > 0
              ? filteredRaces.map((race) => (
                  <RaceCard key={race.race_id} race={race} isPreview={false} />
                ))
              : !error && (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: "var(--space-16)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <p style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>
                      レースデータがありません
                    </p>
                    <p style={{ fontSize: "var(--text-sm)" }}>
                      日付または絞り込み条件を変更してお試しください
                    </p>
                  </div>
                )}
          </div>

          {/* 件数表示 */}
          {!loading && filteredRaces.length > 0 && (
            <p
              style={{
                textAlign: "center",
                marginTop: "var(--space-8)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              {filteredRaces.length} 件のレース
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

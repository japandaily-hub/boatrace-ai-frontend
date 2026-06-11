"use client";

/**
 * RaceCard — レースカードコンポーネント
 * Web Designer C4仕様準拠
 * 固定値判定ロジック必須: top_predicted_win===0.35 or null → 「AI予想: 準備中」
 * weather全件同一判定 → 「天候: 取得中」
 */

import Link from "next/link";
import { VerificationBadge } from "./VerificationBadge";

// 捏造固定値の定義 (絶対に表示してはいけない値)
const FAKE_WIN_RATE = 0.35; // 静的フォールバックの偽予測値

export interface Race {
  race_id: string;
  jyo_name: string;
  race_number: number;
  scheduled_time: string;
  status: string;
  weather: string | null;
  wind_speed: number | null;
  wind_direction: string | null;
  wave_height: number | null;
  temperature: number | null;
  grade: string | null;
  top_pick: number | null;
  top_predicted_win: number | null;
  created_at?: string;
  data_source?: string;
}

interface RaceCardProps {
  race: Race;
  /** LP上のプレビュー表示か否か（true=article、false=div） */
  isPreview?: boolean;
}

/** 気象データが捏造固定値かどうかを判定 */
function isWeatherFake(race: Race): boolean {
  // 固定値: 晴れ / 北 / 3.0 / 5 / 25.0 — ITコンサル実測値
  return (
    race.weather === "晴れ" &&
    race.wind_speed === 3.0 &&
    race.wind_direction === "北" &&
    race.wave_height === 5 &&
    race.temperature === 25.0
  );
}

/** AI予測値が捏造固定値かどうかを判定 */
function isPredictionFake(race: Race): boolean {
  if (race.top_pick === null) return true;
  if (race.top_predicted_win === null) return true;
  if (race.top_predicted_win === FAKE_WIN_RATE) return true;
  return false;
}

/** ステータス表示用バッジスタイル */
function getStatusBadge(status: string): { label: string; style: React.CSSProperties } {
  switch (status) {
    case "selling":
      return {
        label: "発売中",
        style: {
          background: "rgba(34,197,94,0.15)",
          color: "var(--color-success)",
          border: "1px solid rgba(34,197,94,0.3)",
        },
      };
    case "closed":
      return {
        label: "締切",
        style: {
          background: "var(--color-warning-bg)",
          color: "var(--color-warning)",
          border: "1px solid rgba(245,158,11,0.3)",
        },
      };
    case "confirmed":
      return {
        label: "確定",
        style: {
          background: "var(--color-preparing-bg)",
          color: "var(--color-preparing)",
          border: "1px solid rgba(100,116,139,0.3)",
        },
      };
    case "upcoming":
    default:
      return {
        label: "発売前",
        style: {
          background: "var(--color-blue-900)",
          color: "var(--color-blue-300)",
          border: "1px solid rgba(26,108,245,0.3)",
        },
      };
  }
}

/** 締切時刻のJST表示 */
function formatTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--:--";
  }
}

export function RaceCard({ race, isPreview = false }: RaceCardProps) {
  const weatherFake = isWeatherFake(race);
  const predictionFake = isPredictionFake(race);
  const statusBadge = getStatusBadge(race.status);
  const Tag = isPreview ? "article" : "div";

  const cardStyle: React.CSSProperties = {
    background: "var(--color-bg-card)",
    border: "1px solid var(--color-border-default)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-5)",
    boxShadow: "var(--shadow-card)",
    position: "relative",
    transition: `border-color var(--duration-fast), transform var(--duration-fast), box-shadow var(--duration-fast)`,
    cursor: "pointer",
  };

  return (
    <Link
      href="/races"
      aria-label={`${race.jyo_name} 第${race.race_number}レース ${formatTime(race.scheduled_time)}（${isPreview ? "準備中" : statusBadge.label}）`}
    >
      <Tag
        style={cardStyle}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(0, 201, 184, 0.3)";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "var(--shadow-lg)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--color-border-default)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "var(--shadow-card)";
        }}
      >
        {/* 検証中バッジ — 右上固定 */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
          }}
        >
          <VerificationBadge variant="validating" size="sm" />
        </div>

        {/* 場名 */}
        <p
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-1)",
            paddingRight: "100px", // バッジとの重なり防止
          }}
        >
          {race.jyo_name}
        </p>

        {/* レース番号 */}
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-3)",
          }}
        >
          第{race.race_number}レース
        </p>

        {/* 区切り線 */}
        <hr
          style={{
            border: "none",
            borderBottom: "1px solid var(--color-border-subtle)",
            marginBottom: "var(--space-3)",
          }}
        />

        {/* 締切時刻 */}
        <p
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-teal-500)",
            marginBottom: "var(--space-2)",
          }}
        >
          {formatTime(race.scheduled_time)}
        </p>

        {/* ステータスバッジ */}
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: "var(--radius-full)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-semibold)",
            marginBottom: "var(--space-3)",
            ...statusBadge.style,
          }}
        >
          {statusBadge.label}
        </span>

        {/* 天候エリア */}
        <div style={{ marginBottom: "var(--space-2)" }}>
          {weatherFake ? (
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                fontStyle: "italic",
              }}
            >
              天候: 取得中...
              <span className="sr-only">（準備中）</span>
            </p>
          ) : (
            <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
              {race.weather} / {race.wind_direction} /{" "}
              {race.wind_speed != null ? `${race.wind_speed}m/s` : "-"} /{" "}
              波{race.wave_height != null ? `${race.wave_height}cm` : "-"}
            </p>
          )}
        </div>

        {/* AI予想エリア */}
        <div>
          {predictionFake ? (
            <VerificationBadge variant="preparing" size="sm" />
          ) : (
            <div>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                AI予想: {race.top_pick}号艇{" "}
                <span style={{ color: "var(--color-teal-500)", fontWeight: "var(--font-weight-semibold)" }}>
                  ({Math.round((race.top_predicted_win ?? 0) * 100)}%)
                </span>
              </p>
              {/* 確率バー */}
              <div
                style={{
                  marginTop: "var(--space-1)",
                  height: "4px",
                  background: "var(--color-border-default)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.round((race.top_predicted_win ?? 0) * 100)}%`,
                    background: "var(--color-teal-500)",
                    borderRadius: "var(--radius-full)",
                    transition: "width 0.5s var(--easing-out)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Tag>
    </Link>
  );
}

/** スケルトンローディング（APIフェッチ中の表示） */
export function RaceCardSkeleton() {
  return (
    <div
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="skeleton" style={{ height: "28px", width: "60%", marginBottom: "var(--space-2)" }} />
      <div className="skeleton" style={{ height: "16px", width: "40%", marginBottom: "var(--space-3)" }} />
      <hr style={{ border: "none", borderBottom: "1px solid var(--color-border-subtle)", marginBottom: "var(--space-3)" }} />
      <div className="skeleton" style={{ height: "36px", width: "80px", marginBottom: "var(--space-2)" }} />
      <div className="skeleton" style={{ height: "20px", width: "50%", marginBottom: "var(--space-2)" }} />
      <div className="skeleton" style={{ height: "16px", width: "70%", marginBottom: "var(--space-2)" }} />
      <div className="skeleton" style={{ height: "22px", width: "90px" }} />
    </div>
  );
}

export default RaceCard;

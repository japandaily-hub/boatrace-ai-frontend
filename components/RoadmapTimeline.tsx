"use client";

/**
 * RoadmapTimeline — 開発ロードマップタイムライン
 * Web Designer C3仕様準拠。S5セクション用。
 * モバイル縦 / デスクトップ横切替 (CSS Grid)
 */

import React from "react";

type PhaseStatus = "completed" | "in_progress" | "future";

interface Phase {
  id: string;
  phase: string;
  title: string;
  period: string;
  description: string;
  status: PhaseStatus;
  ctaText?: string;
  ctaHref?: string;
}

const PHASES: Phase[] = [
  {
    id: "phase1",
    phase: "Phase 1",
    title: "実在レース・実時刻データ公開",
    period: "現在公開中",
    description:
      "実際に開催されているレースのみを表示。場名・レース番号・発走時刻・グレードを実データから取得します。天候・AI予想は次フェーズで対応します。",
    status: "completed",
  },
  {
    id: "phase2",
    phase: "Phase 2",
    title: "天候・直前情報のリアルタイム取得",
    period: "2026年Q3目標",
    description:
      "天候・風速・波高・気温を30分ごとにリアルタイム取得。「準備中」表示を実データに切り替えます。",
    status: "in_progress",
    ctaText: "進捗をXでフォロー →",
    ctaHref: "https://x.com/",
  },
  {
    id: "phase3",
    phase: "Phase 3",
    title: "AI予想の配信開始 & 的中率全公開",
    period: "2026年Q4目標",
    description:
      "LightGBM（機械学習）によるAI予想の配信を開始します。的中率・回収率は配信開始と同時に全件公開します。隠しません。",
    status: "future",
    ctaText: "進捗をXでフォロー →",
    ctaHref: "https://x.com/",
  },
];

function PhaseIcon({ status }: { status: PhaseStatus }) {
  const baseStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  if (status === "completed") {
    return (
      <span
        style={{
          ...baseStyle,
          background: "var(--color-success)",
        }}
        aria-label="完了"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span
        style={{
          ...baseStyle,
          background: "var(--color-warning)",
        }}
        aria-label="開発中"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ animation: "spin 1.5s linear infinite" }}
        >
          <path
            d="M7 1.5a5.5 5.5 0 1 0 5.5 5.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  // future
  return (
    <span
      style={{
        ...baseStyle,
        background: "transparent",
        border: "2px dashed var(--color-preparing)",
      }}
      aria-label="予定"
    />
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const isCompleted = phase.status === "completed";
  const isInProgress = phase.status === "in_progress";
  const isFuture = phase.status === "future";

  const titleColor = isCompleted
    ? "var(--color-success)"
    : isInProgress
    ? "var(--color-warning)"
    : "var(--color-text-secondary)";

  return (
    <div
      style={{
        opacity: isFuture ? 0.7 : 1,
      }}
    >
      {/* フェーズラベル */}
      <p
        style={{
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-weight-semibold)",
          letterSpacing: "var(--tracking-wide)",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          marginBottom: "var(--space-2)",
        }}
      >
        {phase.phase}
      </p>

      {/* タイトル + ステータスバッジ */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-1)" }}>
        <p
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: "var(--font-weight-bold)",
            color: titleColor,
          }}
        >
          {phase.title}
        </p>
        {isCompleted && (
          <span
            style={{
              fontSize: "var(--text-xs)",
              background: "rgba(34,197,94,0.15)",
              color: "var(--color-success)",
              border: "1px solid rgba(34,197,94,0.3)",
              padding: "2px 8px",
              borderRadius: "var(--radius-full)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            公開中
          </span>
        )}
        {isInProgress && (
          <span
            style={{
              fontSize: "var(--text-xs)",
              background: "var(--color-warning-bg)",
              color: "var(--color-warning)",
              border: "1px solid rgba(245,158,11,0.3)",
              padding: "2px 8px",
              borderRadius: "var(--radius-full)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            開発中
          </span>
        )}
      </div>

      {/* 目標期間 */}
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          marginBottom: "var(--space-3)",
        }}
      >
        {phase.period}
      </p>

      {/* 詳細テキスト */}
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          lineHeight: "var(--leading-relaxed)",
          marginBottom: phase.ctaText ? "var(--space-3)" : 0,
        }}
      >
        {phase.description}
      </p>

      {/* CTAリンク */}
      {phase.ctaText && phase.ctaHref && (
        <a
          href={phase.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-teal-500)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
          }}
        >
          {phase.ctaText}
        </a>
      )}
    </div>
  );
}

export function RoadmapTimeline() {
  return (
    <div>
      {/* モバイル: 縦タイムライン */}
      <div
        className="roadmap-mobile"
        style={{ display: "flex", flexDirection: "column", gap: 0 }}
      >
        <style>{`
          @media (min-width: 768px) {
            .roadmap-mobile { display: none !important; }
            .roadmap-desktop { display: grid !important; }
          }
          @media (max-width: 767px) {
            .roadmap-desktop { display: none !important; }
          }
        `}</style>

        {PHASES.map((phase, idx) => (
          <div
            key={phase.id}
            style={{
              display: "flex",
              gap: "var(--space-4)",
              position: "relative",
            }}
          >
            {/* 左縦線 + アイコン */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <PhaseIcon status={phase.status} />
              {idx < PHASES.length - 1 && (
                <div
                  style={{
                    width: "2px",
                    flex: 1,
                    minHeight: "32px",
                    background: "var(--color-border-default)",
                    marginTop: "var(--space-2)",
                    marginBottom: "var(--space-2)",
                  }}
                />
              )}
            </div>

            {/* コンテンツ */}
            <div
              style={{
                paddingBottom: idx < PHASES.length - 1 ? "var(--space-8)" : 0,
                flex: 1,
              }}
            >
              <PhaseCard phase={phase} />
            </div>
          </div>
        ))}
      </div>

      {/* デスクトップ: 横3カラムグリッド */}
      <div
        className="roadmap-desktop"
        style={{ display: "none" }}
      >
        {/* 横ライン */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            alignItems: "center",
            marginBottom: "var(--space-8)",
            gap: 0,
          }}
        >
          {PHASES.map((phase, idx) => (
            <React.Fragment key={phase.id}>
              <PhaseIcon status={phase.status} />
              {idx < PHASES.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    background: "var(--color-border-default)",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* コンテンツ3列 */}
        {PHASES.map((phase) => (
          <div key={phase.id} style={{ paddingRight: "var(--space-8)" }}>
            <PhaseCard phase={phase} />
          </div>
        ))}
      </div>

      {/* デスクトップ用グリッド CSS */}
      <style>{`
        @media (min-width: 768px) {
          .roadmap-desktop {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default RoadmapTimeline;

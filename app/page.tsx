/**
 * app/page.tsx — LP（ランディングページ）
 * Web Designer 7セクション仕様 + デザイントークン準拠
 * デザイナー仕様: S1ヒーロー〜S7フッター
 * コピー: copywriter-result.md §1 確定稿投入済み (Wave 7 / integration / 2026-06-11)
 */

import Link from "next/link";
import { Suspense } from "react";
import { VerificationBadge } from "@/components/VerificationBadge";
import { RaceCard, RaceCardSkeleton, Race } from "@/components/RaceCard";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://sxhxd2rkyl.execute-api.ap-northeast-1.amazonaws.com/prod";

/** 今日の日付を YYYY-MM-DD 形式で返す (JST) */
function getTodayJST(): string {
  return new Date().toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, "-");
}

/** S3キャッシュ or 静的フォールバックからレースデータを取得 */
async function fetchPreviewRaces(): Promise<{
  races: Race[];
  fetchedAt: string | null;
  dataSource: string;
}> {
  const date = getTodayJST();
  try {
    const res = await fetch(`${API_BASE}/api/races?date=${date}`, {
      next: { revalidate: 300 }, // 5分キャッシュ
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    const races: Race[] = Array.isArray(data) ? data : (data.races ?? []);
    // LP上には先着3件のみ表示
    return {
      races: races.slice(0, 3),
      fetchedAt: data.fetched_at ?? data.created_at ?? null,
      dataSource: data.data_source ?? "unknown",
    };
  } catch {
    return { races: [], fetchedAt: null, dataSource: "error" };
  }
}

/** 最終更新時刻を JST HH:MM 形式で表示 */
function formatFetchedAt(fetchedAt: string | null): string {
  if (!fetchedAt) return "--:--（準備中）";
  try {
    return new Date(fetchedAt).toLocaleTimeString("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--:--";
  }
}

// ─────────────────────────────────────────────
// S3: レースプレビューセクション (非同期RSC)
// ─────────────────────────────────────────────
async function RacePreviewSection() {
  const { races, fetchedAt } = await fetchPreviewRaces();

  return (
    <section
      id="preview"
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--space-16) 0",
      }}
    >
      <div className="container">
        {/* ヘッダー */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "var(--space-3)",
            marginBottom: "var(--space-8)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-text-primary)",
            }}
          >
            今日の注目レース
          </h2>
          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            最終更新 {formatFetchedAt(fetchedAt)} ↻
          </p>
        </div>

        {/* レースカードグリッド */}
        {races.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--space-4)",
              marginBottom: "var(--space-8)",
            }}
          >
            {races.map((race) => (
              <RaceCard key={race.race_id} race={race} isPreview />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--space-4)",
              marginBottom: "var(--space-8)",
            }}
          >
            {[1, 2, 3].map((i) => (
              <RaceCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* セカンダリCTA */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/races"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-8)",
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--color-cta-primary)",
              color: "var(--color-cta-primary)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-bold)",
              letterSpacing: "var(--tracking-wide)",
              transition: "all var(--duration-normal) var(--easing-out)",
              background: "transparent",
              textDecoration: "none",
            }}
          >
            全レースを見る →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// メインページコンポーネント
// ─────────────────────────────────────────────
export default function LandingPage() {
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
          <nav aria-label="メインナビゲーション">
            <Link
              href="/races"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border-default)",
                textDecoration: "none",
                transition: "all var(--duration-fast)",
              }}
            >
              今日のレース
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ─── S1: ヒーロー ─── */}
        <section
          id="hero"
          style={{
            minHeight: "calc(100svh - var(--nav-height))",
            background: `linear-gradient(
              135deg,
              var(--color-bg-primary) 0%,
              var(--color-blue-900) 50%,
              var(--color-bg-primary) 100%
            )`,
            display: "flex",
            alignItems: "center",
            padding: "var(--space-16) 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 背景装飾: 波紋SVG */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-10%",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.05,
              width: "600px",
              height: "600px",
            }}
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle cx="200" cy="200" r="150" stroke="#00c9b8" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="120" stroke="#00c9b8" strokeWidth="1" />
            <circle cx="200" cy="200" r="90" stroke="#00c9b8" strokeWidth="0.8" />
            <circle cx="200" cy="200" r="60" stroke="#00c9b8" strokeWidth="0.6" />
            <circle cx="200" cy="200" r="30" stroke="#00c9b8" strokeWidth="0.5" />
          </svg>

          <div className="container" style={{ width: "100%" }}>
            <div
              style={{
                maxWidth: "680px",
                animation: "fadeInUp 0.6s var(--easing-out) both",
              }}
            >
              {/* 検証中バッジ */}
              <div style={{ marginBottom: "var(--space-6)" }}>
                <VerificationBadge variant="validating" />
              </div>

              {/* H1 */}
              <h1
                style={{
                  fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
                  fontWeight: "var(--font-weight-black)",
                  letterSpacing: "var(--tracking-tight)",
                  lineHeight: "var(--leading-tight)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-6)",
                }}
              >
                AIが競艇を予想する、
                <br />
                無料で、正直に。
              </h1>

              {/* サブコピー */}
              <p
                style={{
                  fontSize: "var(--text-lg)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-8)",
                  maxWidth: "480px",
                }}
              >
                登録不要、すぐ使える。レース結果は全件公開—永久無料。
              </p>

              {/* CTA ボタン */}
              <Link
                href="/races"
                aria-label="今日のレース一覧ページを開く"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  width: "100%",
                  maxWidth: "320px",
                  height: "56px",
                  padding: "0 var(--space-8)",
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-cta-primary)",
                  color: "#ffffff",
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "var(--tracking-wide)",
                  boxShadow: "var(--shadow-cta)",
                  textDecoration: "none",
                  transition: "all var(--duration-normal) var(--easing-out)",
                  marginBottom: "var(--space-6)",
                }}
              >
                今日のレース一覧を見る →
              </Link>

              {/* 免責一行 */}
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-muted)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                予想は参考情報です。舟券の購入は20歳以上・自己責任でお願いします。
              </p>
            </div>
          </div>

          {/* スクロール誘導矢印 */}
          <div
            style={{
              position: "absolute",
              bottom: "var(--space-8)",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "fadeInUp 1s 0.8s both",
            }}
          >
            <a
              href="#features"
              aria-label="スクロールして詳しく見る"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-2)",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                fontSize: "var(--text-xs)",
              }}
            >
              <span>スクロールして詳しく見る</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ animation: "fadeInUp 1.5s ease infinite alternate" }}
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* ─── S2: 3つの特徴 ─── */}
        <section id="features" style={{ padding: "var(--space-16) 0" }}>
          <div className="container">
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-weight-bold)",
                textAlign: "center",
                marginBottom: "var(--space-12)",
                color: "var(--color-text-primary)",
              }}
            >
              このサービスを選ぶ理由
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "var(--space-6)",
              }}
            >
              {/* 特徴1: 完全無料 */}
              <div
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-6)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--text-4xl)",
                    marginBottom: "var(--space-4)",
                  }}
                  aria-hidden="true"
                >
                  💰
                </div>
                <h3
                  style={{
                    fontSize: "var(--text-xl)",
                    fontWeight: "var(--font-weight-bold)",
                    marginBottom: "var(--space-3)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  完全無料・登録不要
                </h3>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  有料プランは存在しません。登録なしで今すぐ全機能を使えます。費用は永遠にゼロです。
                </p>
              </div>

              {/* 特徴2: AIが全レース予想 */}
              <div
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-6)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{ fontSize: "var(--text-4xl)", marginBottom: "var(--space-4)" }}
                  aria-hidden="true"
                >
                  🤖
                </div>
                <h3
                  style={{
                    fontSize: "var(--text-xl)",
                    fontWeight: "var(--font-weight-bold)",
                    marginBottom: "var(--space-3)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  AIが全レース自動予想
                </h3>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  過去のレースデータをAI（LightGBM）が学習。24場・全レースを自動で分析します。
                </p>
              </div>

              {/* 特徴3: 実績を全部公開 */}
              <div
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border-default)",
                  borderTop: "3px solid var(--color-teal-500)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-6)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{ fontSize: "var(--text-4xl)", marginBottom: "var(--space-4)" }}
                  aria-hidden="true"
                >
                  📊
                </div>
                <h3
                  style={{
                    fontSize: "var(--text-xl)",
                    fontWeight: "var(--font-weight-bold)",
                    marginBottom: "var(--space-3)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  実績を全件公開します
                </h3>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  当たっても外れても、的中率・回収率を全件記録してオープンにします。隠す数字はありません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── S3: 今日のレースプレビュー (動的・Server Component) ─── */}
        <Suspense
          fallback={
            <section
              style={{
                background: "var(--color-bg-secondary)",
                padding: "var(--space-16) 0",
              }}
            >
              <div className="container">
                <h2
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: "var(--font-weight-bold)",
                    marginBottom: "var(--space-8)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  今日の注目レース
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "var(--space-4)",
                  }}
                >
                  {[1, 2, 3].map((i) => (
                    <RaceCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <RacePreviewSection />
        </Suspense>

        {/* ─── S4: AIの仕組み ─── */}
        <section id="how" style={{ padding: "var(--space-16) 0" }}>
          <div className="container">
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-weight-bold)",
                textAlign: "center",
                marginBottom: "var(--space-12)",
                color: "var(--color-text-primary)",
              }}
            >
              AIが予想する仕組み
            </h2>

            {/* 4ステップフロー */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "var(--space-6)",
                marginBottom: "var(--space-10)",
              }}
            >
              {[
                {
                  step: "①",
                  title: "データ収集",
                  body: "過去のレース情報・選手成績・天候・艇番データを収集",
                },
                {
                  step: "②",
                  title: "AI学習",
                  body: "LightGBM（機械学習）が勝ちパターンを自動で学習します",
                },
                {
                  step: "③",
                  title: "予想生成",
                  body: "学習したパターンから各レースの1着を予測・スコアを算出",
                },
                {
                  step: "④",
                  title: "結果を全件公開",
                  body: "的中率・回収率をリアルタイムで公開。隠しません。",
                  accent: true,
                },
              ].map(({ step, title, body, accent }) => (
                <div
                  key={step}
                  style={{
                    background: "var(--color-bg-card)",
                    border: accent
                      ? "2px solid var(--color-teal-500)"
                      : "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-6)",
                    boxShadow: accent ? "var(--shadow-glow-teal)" : "var(--shadow-card)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "var(--text-2xl)",
                      fontWeight: "var(--font-weight-black)",
                      color: "var(--color-teal-500)",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {step}
                  </p>
                  <h3
                    style={{
                      fontSize: "var(--text-lg)",
                      fontWeight: "var(--font-weight-bold)",
                      marginBottom: "var(--space-2)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-secondary)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>

            {/* LightGBM補足説明 */}
            <div
              style={{
                maxWidth: "640px",
                margin: "0 auto",
                padding: "var(--space-4) var(--space-6)",
                background: "var(--color-bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                <strong style={{ color: "var(--color-text-primary)" }}>LightGBMとは？</strong>
                　Microsoftが開発した高精度機械学習ライブラリ。スポーツ予測・金融モデリングで世界中のデータサイエンティストが使っています。
              </p>
            </div>
          </div>
        </section>

        {/* ─── S5: ロードマップ ─── */}
        <section
          id="roadmap"
          style={{
            background: "var(--color-bg-secondary)",
            padding: "var(--space-16) 0",
          }}
        >
          <div className="container">
            <div style={{ marginBottom: "var(--space-12)" }}>
              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-2)",
                }}
              >
                開発ロードマップ
              </h2>
              <p
                style={{
                  fontSize: "var(--text-lg)",
                  color: "var(--color-teal-500)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                「準備中」を隠しません
              </p>
            </div>
            <RoadmapTimeline />
          </div>
        </section>

        {/* ─── S6: FAQ ─── */}
        <section id="faq" style={{ padding: "var(--space-16) 0" }}>
          <div className="container">
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-weight-bold)",
                textAlign: "center",
                marginBottom: "var(--space-12)",
                color: "var(--color-text-primary)",
              }}
            >
              よくある質問
            </h2>
            <FaqAccordion />
          </div>
        </section>
      </main>

      {/* ─── S7: フッター ─── */}
      <Footer />
    </>
  );
}

"use client";

/**
 * Footer — 全ページ共通フッター
 * Web Designer C6仕様準拠
 * 法的4リンク必須: /legal/disclaimer, /legal/terms, /legal/privacy, /legal/company
 * ギャンブル依存症注意喚起含む
 */

import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border-default)",
      }}
    >
      <div className="container">
        {/* メインフッターグリッド */}
        <div
          style={{
            padding: "var(--space-12) 0",
            display: "grid",
            gap: "var(--space-8)",
          }}
        >
          <style>{`
            @media (min-width: 768px) {
              .footer-grid {
                grid-template-columns: 2fr 1fr 1fr !important;
              }
            }
          `}</style>
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-8)",
            }}
          >
            {/* ブランド + 免責 */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  marginBottom: "var(--space-4)",
                }}
              >
                <span style={{ fontSize: "var(--text-2xl)" }} aria-hidden="true">
                  ⛵
                </span>
                <span
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  艇王
                </span>
              </div>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-4)",
                }}
              >
                AIが競艇の全レースを無料で予想します。
                <br />
                予想は参考情報です。舟券の購入は自己責任でお願いします。
              </p>
            </div>

            {/* リンク集 */}
            <div>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "var(--space-4)",
                }}
              >
                サービス
              </p>
              <nav aria-label="フッターナビゲーション">
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                  }}
                >
                  {[
                    { href: "/races", label: "今日のレース一覧" },
                    { href: "/legal/terms", label: "利用規約" },
                    { href: "/legal/privacy", label: "プライバシーポリシー" },
                    { href: "/legal/disclaimer", label: "免責事項" },
                    { href: "/legal/company", label: "運営者情報" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                          textDecoration: "none",
                          transition: "color var(--duration-fast)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--color-text-primary)";
                          (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                            "underline";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--color-text-secondary)";
                          (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                            "none";
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ギャンブル依存症注意喚起 */}
            <div>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "var(--space-4)",
                }}
              >
                注意事項
              </p>
              <div
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-3) var(--space-4)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  競艇は20歳になってから。本サービスは20歳未満の方のご利用をお断りします。
                  <br />
                  ボートレースは公営競技です。のめり込みにご注意ください。
                  <br />
                  <br />
                  <strong style={{ color: "var(--color-text-primary)" }}>
                    ギャンブル等依存症に関する相談窓口
                  </strong>
                  <br />
                  ・認定NPO法人 ギャンブル依存症問題を考える会:{" "}
                  <a
                    href="https://scgr.or.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--color-teal-500)",
                      textDecoration: "underline",
                    }}
                  >
                    https://scgr.or.jp/
                  </a>
                  <br />
                  ・お近くの精神保健福祉センター（各都道府県設置の公的相談窓口）
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div
          style={{
            borderTop: "1px solid var(--color-border-default)",
            padding: "var(--space-6) 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-3)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            © 2026 艇王. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            本サービスはボートレース公式サービスではありません
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

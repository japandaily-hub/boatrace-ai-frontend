/**
 * app/legal/company/page.tsx — 運営者情報ページ
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "艇王の運営者情報",
  robots: { index: true, follow: true },
};

export default function CompanyPage() {
  return (
    <>
      <header
        style={{
          height: "var(--nav-height)",
          background: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border-default)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container" style={{ width: "100%" }}>
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
        </div>
      </header>

      <main>
        <div
          className="container"
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "var(--space-16) var(--space-4)",
          }}
        >
          <h1
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: "var(--font-weight-bold)",
              marginBottom: "var(--space-8)",
              color: "var(--color-text-primary)",
            }}
          >
            運営者情報
          </h1>

          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { label: "サービス名", value: "艇王" },
                  { label: "運営形態", value: "個人運営" },
                  { label: "運営者名", value: "艇王運営事務局" },
                  { label: "連絡先", value: "ko.13.hei@gmail.com" },
                  { label: "サービスURL", value: "https://boatrace-ai-frontend.vercel.app" },
                  {
                    label: "本サービスについて",
                    value: "本サービスはボートレース公式サービスではなく、施行者・主催者その他公的機関とは一切関係のない個人運営の情報提供サービスです。",
                  },
                ].map(({ label, value }) => (
                  <tr key={label} style={{ borderBottom: "1px solid var(--color-border-default)" }}>
                    <th
                      style={{
                        padding: "var(--space-4) var(--space-4) var(--space-4) 0",
                        textAlign: "left",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--color-text-primary)",
                        whiteSpace: "nowrap",
                        verticalAlign: "top",
                        width: "140px",
                      }}
                    >
                      {label}
                    </th>
                    <td style={{ padding: "var(--space-4) 0", color: "var(--color-text-secondary)" }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p style={{ marginTop: "var(--space-8)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
              ※ お問い合わせへの返信は、内容によりお時間をいただく場合があります。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

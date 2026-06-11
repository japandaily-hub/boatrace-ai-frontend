/**
 * app/legal/privacy/page.tsx — プライバシーポリシーページ
 * 文面: legal-result.md §4-C（確定稿・GA4外部送信規律対応込み）
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "艇王のプライバシーポリシー",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
            プライバシーポリシー
          </h1>

          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            <p style={{ marginBottom: "var(--space-6)" }}>施行日: 2026年6月11日</p>
            <p style={{ marginBottom: "var(--space-6)" }}>
              「艇王」（以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の保護に関する法律（個人情報保護法）その他の関係法令を遵守するとともに、以下の方針に基づき情報を取り扱います。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>1. 取得する情報</h2>
            <p style={{ marginBottom: "var(--space-3)" }}>
              当サイトは会員登録を必要とせず、氏名・住所・電話番号等の個人情報を直接取得することはありません。一方、当サイトでは、アクセス解析のため、以下の情報を自動的に取得することがあります。
            </p>
            <ul style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li>Cookie（クッキー）および類似技術によって付与される識別子</li>
              <li>IPアドレス</li>
              <li>閲覧したページのURL、滞在時間、参照元（リファラー）</li>
              <li>端末の種類、OS、ブラウザの種類・言語等の情報</li>
            </ul>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>2. 利用目的</h2>
            <p style={{ marginBottom: "var(--space-3)" }}>取得した情報は、次の目的のために利用します。</p>
            <ul style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li>本サービスの利用状況の把握、品質改善および機能改善</li>
              <li>アクセス状況の統計的な分析</li>
              <li>不正アクセスその他の不正行為の防止</li>
            </ul>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>3. アクセス解析ツール（Google アナリティクス）の利用</h2>
            <p style={{ marginBottom: "var(--space-4)" }}>
              当サイトは、サービス向上のため、Google LLC が提供するアクセス解析ツール「Google アナリティクス（Google Analytics 4）」を利用しています。Google アナリティクスは、Cookie等を利用して利用者の情報を収集します。これにより収集される情報は、Google社のプライバシーポリシーに基づいて管理されます。
            </p>
            <ul style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li>
                Google プライバシーポリシー:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-teal-500)", textDecoration: "underline" }}>
                  https://policies.google.com/privacy
                </a>
              </li>
              <li>
                Google アナリティクスの利用規約:{" "}
                <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-teal-500)", textDecoration: "underline" }}>
                  https://marketingplatform.google.com/about/analytics/terms/jp/
                </a>
              </li>
            </ul>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトは、IPアドレスの匿名化（IPマスキング）等、Googleが提供する設定の範囲でプライバシーに配慮した運用を行います。利用者は、ブラウザの設定でCookieを無効化することにより、または「Google アナリティクス オプトアウト アドオン」（
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-teal-500)", textDecoration: "underline" }}>
                https://tools.google.com/dlpage/gaoptout
              </a>
              ）を導入することにより、情報の収集を拒否することができます。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>4. 外部送信について（電気通信事業法に基づく公表）</h2>
            <p style={{ marginBottom: "var(--space-3)" }}>
              当サイトでは、上記アクセス解析のため、利用者の端末から第三者へ情報が送信されます。送信の内容は以下のとおりです。
            </p>
            <ul style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li>送信先事業者: Google LLC（Google アナリティクス）</li>
              <li>送信される情報: Cookie等の識別子、IPアドレス、閲覧ページのURL、参照元、端末・ブラウザに関する情報</li>
              <li>利用目的: 当サイトのアクセス状況の測定・分析</li>
              <li>送信の停止方法: ブラウザのCookie無効化設定、または上記オプトアウトアドオンの導入</li>
            </ul>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>5. 第三者提供</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトは、上記アクセス解析ツールの利用に伴う提供を除き、取得した情報を、法令に基づく場合を除いて第三者に提供しません。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>6. Cookieの利用</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトは、利便性向上およびアクセス解析のためにCookieを利用します。利用者は、ブラウザの設定によりCookieの受け取りを拒否し、または削除することができます。ただし、その場合、本サービスの一部が正しく機能しないことがあります。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>7. 安全管理</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトは、取得した情報の漏えい、滅失または毀損の防止その他の安全管理のために、必要かつ適切な措置を講じます。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>8. お問い合わせ</h2>
            <p style={{ marginBottom: "var(--space-3)" }}>本ポリシーに関するお問い合わせは、以下の連絡先までご連絡ください。</p>
            <ul style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li>運営者: kohei（個人運営）</li>
              <li>連絡先: ko.13.hei@gmail.com</li>
            </ul>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>9. プライバシーポリシーの変更</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトは、法令の変更等に応じて、本ポリシーを予告なく変更することがあります。変更後の内容は、当サイトに掲載した時点から効力を生じます。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

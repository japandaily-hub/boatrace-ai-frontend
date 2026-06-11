/**
 * app/legal/disclaimer/page.tsx — 免責事項ページ
 * 文面: legal-result.md §4-A（確定稿）
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "免責事項",
  description: "艇王の免責事項ページ",
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
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
            免責事項
          </h1>

          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            <p style={{ marginBottom: "var(--space-6)" }}>最終改定日: 2026年6月11日</p>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイト「艇王」（以下「当サイト」）をご利用いただくにあたり、以下の事項に同意したものとみなします。ご利用の前に必ずお読みください。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>1. 予想情報の性質</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトが提供するAIによる予想、データ分析、統計情報その他一切の情報（以下「予想情報」）は、過去のデータ等に基づく参考情報であり、レース結果、的中、利益または収益を保証するものではありません。予想情報はあくまで利用者ご自身の判断材料の一つであり、舟券の購入を推奨・勧誘するものではありません。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>2. 自己責任の原則</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              舟券の購入その他の意思決定は、利用者ご自身の判断と責任において行ってください。当サイトの予想情報を利用したことにより生じたいかなる損失・損害についても、当サイトは責任を負いません。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>3. 年齢に関する制限</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              舟券の購入は、モーターボート競走法により20歳以上に限られています。20歳未満の方の舟券購入は法律で禁止されており、当サイトのご利用もお断りします。なお、舟券は公式の投票サービス、競走場および場外発売場でのみ購入できます。当サイトは舟券の販売・購入の代行・媒介を一切行いません。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>4. データの正確性</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトは、BOAT RACE公式サイト等の公開情報をもとにデータを取得・処理して表示していますが、その正確性、完全性、最新性、有用性を保証するものではありません。AI予想モデルおよび一部のデータは現在検証・準備中であり、表示内容は予告なく変更される場合があります。データの取得状況により、一部項目を「検証中」「準備中」「取得中」と表示することがあります。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>5. 責任の制限</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトの故意または重大な過失による場合を除き、当サイトは、予想情報の利用、当サイトの利用または利用不能、データの誤り・遅延・中断、外部サイトへのリンク先の内容等に起因して利用者に生じたいかなる損害についても、一切の責任を負いません。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>6. ギャンブル等依存症への注意</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              ボートレースは公営競技です。のめり込みは生活に深刻な影響を及ぼすおそれがあります。ご自身やご家族の状況に不安を感じた場合は、ページ下部に記載の相談窓口へご相談ください。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>7. 本免責事項の変更</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>
              当サイトは、必要に応じて本免責事項を予告なく変更することがあります。変更後の内容は、当サイトに掲載した時点から効力を生じます。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

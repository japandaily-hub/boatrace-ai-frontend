/**
 * app/legal/terms/page.tsx — 利用規約ページ
 * 文面: legal-result.md §4-B（確定稿）
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "利用規約",
  description: "艇王の利用規約",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
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
            利用規約
          </h1>

          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            <p style={{ marginBottom: "var(--space-6)" }}>
              最終改定日: 2026年6月11日
            </p>

            <p style={{ marginBottom: "var(--space-6)" }}>
              本利用規約（以下「本規約」）は、「艇王」（以下「当サイト」）の利用条件を定めるものです。利用者は、当サイトを利用することにより本規約に同意したものとみなされます。
            </p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第1条（適用）</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>本規約は、当サイトの提供するすべてのサービス（以下「本サービス」）の利用に適用されます。当サイトが別途定めるガイドライン・注意事項等も本規約の一部を構成します。</p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第2条（本サービスの内容）</h2>
            <ol style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <li>本サービスは、ボートレース（競艇）に関するAIを用いた予想、データ分析および関連情報を、無料で提供する個人運営の情報提供サービスです。</li>
              <li>本サービスはボートレースの公式サービスではなく、施行者・主催者その他公的機関とは一切関係ありません。</li>
              <li>本サービスは舟券の販売、購入の代行または媒介を行うものではありません。舟券は、公式の投票サービス、競走場および場外発売場においてのみ購入できます。</li>
              <li>本サービスで提供する予想情報は参考情報であり、的中・利益を保証するものではありません（詳細は免責事項に定めます）。</li>
            </ol>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第3条（利用資格・年齢制限）</h2>
            <ol style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <li>本サービスは、ボートレースを適法に楽しむことができる方を対象とします。</li>
              <li>舟券の購入はモーターボート競走法により20歳以上に限られます。20歳未満の方は本サービスをご利用いただけません。</li>
            </ol>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第4条（禁止事項）</h2>
            <p style={{ marginBottom: "var(--space-3)" }}>利用者は、本サービスの利用にあたり、次の各号の行為をしてはなりません。</p>
            <ol style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <li>法令または公序良俗に違反する行為</li>
              <li>当サイトまたは第三者の著作権、その他の権利を侵害する行為</li>
              <li>当サイトのコンテンツ（予想情報・データ・文章・デザイン等）を、当サイトの許諾なく複製、転載、改変、再配布、または商用利用する行為</li>
              <li>自動化された手段（スクレイピング、クローラー、ボット等）により本サービスへ過度な負荷を与える行為</li>
              <li>本サービスの運営を妨害する行為、不正アクセス、その他当サイトが不適切と判断する行為</li>
            </ol>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第5条（知的財産権）</h2>
            <ol style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <li>当サイトが提供する予想情報、AIモデルの出力、文章、デザイン、ロゴその他のコンテンツに関する著作権その他の知的財産権は、当サイトまたは正当な権利者に帰属します。</li>
              <li>当サイトが表示するレースデータ等の事実情報は、BOAT RACE公式サイト等の公開情報をもとに当サイトが独自に取得・処理したものです。</li>
            </ol>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第6条（予想情報の非保証・免責）</h2>
            <ol style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <li>本サービスの予想情報は、レース結果、的中、利益または収益を一切保証しません。</li>
              <li>舟券購入を含む一切の意思決定は、利用者自身の判断と責任において行うものとします。</li>
              <li>その他の免責については、別途定める免責事項によります。</li>
            </ol>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第7条（サービスの変更・中断・終了）</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>当サイトは、利用者への事前の通知なく、本サービスの内容を変更し、または本サービスの提供を中断・終了することができます。これにより利用者に生じた損害について、当サイトは責任を負いません。</p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第8条（広告等）</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>当サイトは、将来、本サービス内に広告（アフィリエイト広告を含む）を掲載することがあります。その場合、当サイトは法令に従い、広告である旨を明示します。</p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第9条（個人情報の取扱い）</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>当サイトは、利用者の情報を別途定めるプライバシーポリシーに従って取り扱います。</p>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第10条（準拠法・裁判管轄）</h2>
            <ol style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <li>本規約の解釈および適用は、日本法に準拠します。</li>
              <li>本サービスに関して当サイトと利用者の間に紛争が生じた場合には、当サイト運営者の住所地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ol>

            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)", marginTop: "var(--space-8)" }}>第11条（本規約の変更）</h2>
            <p style={{ marginBottom: "var(--space-6)" }}>当サイトは、必要と判断した場合、利用者への事前の通知なく本規約を変更することができます。変更後の本規約は、当サイトに掲載した時点から効力を生じます。</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

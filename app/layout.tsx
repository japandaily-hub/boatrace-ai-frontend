import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ボートレース AI 予想",
  description: "LightGBM 2段階モデルによる競艇AI予想プラットフォーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="bg-slate-900">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        {/* ─── ヘッダー ─────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="text-xl">⛵</span>
              ボートレース AI
            </a>
            <nav className="flex items-center gap-4 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition-colors">レース一覧</a>
              <span className="text-slate-600">|</span>
              {process.env.NEXT_PUBLIC_API_BASE ? (
                <span className="rounded bg-green-900 px-2 py-0.5 text-xs text-green-300">
                  本番データ
                </span>
              ) : (
                <span className="rounded bg-sky-900 px-2 py-0.5 text-xs text-sky-300">
                  β版 - モックデータ
                </span>
              )}
            </nav>
          </div>
        </header>

        {/* ─── メインコンテンツ ─────────────────────────── */}
        <main className="mx-auto max-w-6xl px-4 py-6">
          {children}
        </main>

        {/* ─── フッター ─────────────────────────────────── */}
        <footer className="mt-12 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
          <p>ボートレース AI 予想 — AI予測は参考情報です。舟券購入は自己責任でお願いします。</p>
          <p className="mt-1">SCRAPE_DELAY = 3秒 厳守 | 競艇公式サイト利用規約に準拠</p>
        </footer>
      </body>
    </html>
  );
}

/**
 * layout.tsx — ルートレイアウト
 * - メタデータ (OGP / Twitterカード) 設定
 * - GA4スニペット (NEXT_PUBLIC_GA_ID 環境変数使用)
 * - デザイントークン globals.css インポート
 */

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://boatrace-ai-frontend.vercel.app";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const metadata: Metadata = {
  title: {
    default: "艇王｜競艇AI予想（無料・的中実績全公開）",
    template: "%s | 艇王",
  },
  description:
    "競艇の全レースをAIが無料予想。的中実績は全件公開。登録不要・20歳以上対象。ボートレース公式サービスではありません。",
  metadataBase: new URL(SITE_URL),
  keywords: ["競艇", "ボートレース", "AI予想", "無料", "的中率", "LightGBM"],
  authors: [{ name: "艇王運営事務局" }],

  // OGP
  openGraph: {
    type: "website",
    title: "艇王 — AIが競艇を無料で予想",
    description:
      "AIが今日の競艇全レースを無料予想。的中率・回収率は配信開始と同時に全件公開します。登録不要ですぐ使える。20歳以上対象。",
    url: SITE_URL,
    siteName: "艇王",
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: "艇王 — AIが競艇を予想する、無料で、正直に。",
      },
    ],
    locale: "ja_JP",
  },

  // Twitterカード
  twitter: {
    card: "summary_large_image",
    title: "艇王 — AIが競艇を無料で予想",
    description:
      "競艇の全レースをAIが無料予想。的中実績は全件公開（隠しません）。登録不要・20歳以上対象。",
    images: [`${SITE_URL}/api/og`],
  },

  // ファビコン
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // robots
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Noto Sans JP フォント */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* GA4スニペット — NEXT_PUBLIC_GA_ID が設定されている場合のみ有効 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}

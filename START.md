# ボートレース AI 予想フロントエンド — 起動ガイド

## 🚀 ローカル起動（3ステップ）

```bash
# 1. nextjs_app ディレクトリへ移動
cd nextjs_app

# 2. 依存パッケージをインストール（初回のみ）
npm install

# 3. 開発サーバーを起動
npm run dev
```

ブラウザで **http://localhost:3000** を開く → レース一覧画面が表示されます。

---

## 📁 ディレクトリ構成

```
nextjs_app/
├── app/
│   ├── layout.tsx             ← 共通レイアウト（ヘッダー/フッター）
│   ├── page.tsx               ← レース一覧ページ (/)
│   ├── globals.css            ← Tailwind + グローバルスタイル
│   ├── api/
│   │   ├── races/route.ts     ← GET /api/races?date=YYYY-MM-DD
│   │   └── race/[race_id]/route.ts  ← GET /api/race/:id
│   └── race/[race_id]/
│       └── page.tsx           ← レース詳細ページ
├── lib/
│   └── mock_data.ts           ← ローカル開発用モックデータ
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## 🔌 本番 API への接続

`.env.local` を作成して API エンドポイントを設定：

```bash
# nextjs_app/.env.local
NEXT_PUBLIC_API_BASE=https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod
```

設定すると `/api/races` と `/api/race/[id]` が AWS API Gateway に転送されます。  
未設定の場合はモックデータ（`lib/mock_data.ts`）を使用します。

---

## ☁️ Vercel デプロイ（無料）

```bash
# Vercel CLI をインストール
npm i -g vercel

# プロジェクトルートから（nextjs_app/ の中から実行）
vercel
```

デプロイ後に Vercel ダッシュボード → Settings → Environment Variables で  
`NEXT_PUBLIC_API_BASE` を設定すると本番 API と接続されます。

---

## ⚙️ 環境要件

| ツール | 推奨バージョン |
|--------|--------------|
| Node.js | 18.x 以上 |
| npm | 9.x 以上 |

---

## 📺 画面構成

| URL | 内容 |
|-----|------|
| `/` | レース一覧（日付ナビ・フィルター・5分ポーリング） |
| `/race/20260610_01_01` | レース詳細（AI予測・スタート展示・選手カード・レーダーチャート・30秒ポーリング） |

---

## 🔒 スクレイピング遵守事項（バックエンド側）

- `SCRAPE_DELAY = 3`（絶対変更禁止）
- 全 HTTP リクエスト前に `time.sleep(3)` を厳守
- 競艇公式サイト・JMA 気象庁 API の利用規約に準拠

"use client";

/**
 * FaqAccordion — よくある質問アコーディオン
 * Web Designer C5仕様準拠 (アクセシビリティ: aria-expanded, aria-controls, role)
 * マーケター S6: FAQ項目5問実装
 */

import { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "free",
    question: "本当に無料ですか？",
    answer:
      "完全無料です。会員登録も不要で、今すぐ全機能をお使いいただけます。有料プランは存在しません。将来もこの方針は変わりません。",
  },
  {
    id: "guarantee",
    question: "予想の的中を保証しますか？",
    answer:
      "的中を保証しません。AI予想はあくまでも参考情報です。舟券の購入は必ずご自身の判断と責任で行ってください。競艇は公営競技であり、いかなる場合も結果を約束するものではありません。",
  },
  {
    id: "age",
    question: "20歳未満でも使えますか？",
    answer:
      "20歳未満の方のご利用はお断りしております。モーターボート競走法により、舟券の購入は20歳以上の方に限られています。本サービスはボートレースを適法にお楽しみになれる方を対象としています。",
  },
  {
    id: "datasource",
    question: "データはどこから取得しますか？",
    answer:
      "BOAT RACE公式サイト等の公開情報をもとに、当サービスが独自に処理・表示しています。本サービスはボートレース公式サービスではなく、施行者・主催者との関係は一切ありません。",
  },
  {
    id: "privacy",
    question: "個人情報は収集しますか？",
    answer: (
      <>
        会員登録機能がないため、お名前・メールアドレス等の個人情報は収集しません。アクセス解析（Google Analytics 4）によるアクセスログの取得のみ行っています。詳細は
        <a
          href="/legal/privacy"
          style={{ color: "var(--color-teal-500)", textDecoration: "underline" }}
        >
          プライバシーポリシー
        </a>
        をご確認ください。
      </>
    ),
  },
];

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
      }}
    >
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            style={{
              borderBottom: "1px solid var(--color-border-default)",
              ...(idx === 0
                ? { borderTop: "1px solid var(--color-border-default)" }
                : {}),
            }}
          >
            {/* 質問行（trigger） */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              onClick={() => toggle(item.id)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--space-5) 0",
                cursor: "pointer",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--color-text-primary)",
                background: "none",
                border: "none",
                textAlign: "left",
                minHeight: "44px",
                transition: "color var(--duration-fast)",
                gap: "var(--space-3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-teal-400)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-text-primary)";
              }}
            >
              <span style={{ flex: 1 }}>{item.question}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  flexShrink: 0,
                  color: "var(--color-teal-500)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: `transform var(--duration-normal)`,
                }}
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 回答エリア */}
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? "500px" : "0",
                transition: `max-height var(--duration-normal) var(--easing-out)`,
              }}
            >
              <p
                style={{
                  paddingBottom: "var(--space-5)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FaqAccordion;

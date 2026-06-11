"use client";

/**
 * VerificationBadge — 検証中 / 準備中バッジコンポーネント
 * Web Designer C2仕様に完全準拠
 */

type VerificationBadgeVariant = "validating" | "preparing";
type VerificationBadgeSize = "sm" | "md";

interface VerificationBadgeProps {
  variant?: VerificationBadgeVariant;
  size?: VerificationBadgeSize;
  className?: string;
}

export function VerificationBadge({
  variant = "validating",
  size = "md",
  className = "",
}: VerificationBadgeProps) {
  const isValidating = variant === "validating";

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: isValidating
      ? "var(--color-warning-bg)"
      : "var(--color-preparing-bg)",
    border: `1px solid ${
      isValidating
        ? "rgba(245,158,11,0.4)"
        : "rgba(100,116,139,0.4)"
    }`,
    color: isValidating
      ? "var(--color-warning)"
      : "var(--color-preparing)",
    padding: size === "sm" ? "4px 10px" : "6px 16px",
    borderRadius: "var(--radius-full)",
    fontSize: size === "sm" ? "var(--text-xs)" : "0.8rem",
    fontWeight: "var(--font-weight-semibold)",
    letterSpacing: "var(--tracking-wide)",
    textTransform: "uppercase" as const,
    whiteSpace: "nowrap" as const,
  };

  return (
    <span style={containerStyle} className={className}>
      {isValidating && (
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--color-warning)",
            animation: "pulse 2s infinite",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      )}
      <span>{isValidating ? "AI予想 検証中" : "準備中"}</span>
    </span>
  );
}

export default VerificationBadge;

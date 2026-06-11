import { redirect } from "next/navigation";

/**
 * Phase 1: レース詳細ページ（AI予想UI）は非公開。
 * 理由: AI予想はバックテスト合格（的中率≥25%・回収率≥70%・Brier<0.20・n≥1000）まで
 *       公開しないリリースゲート方針のため。旧URLへの直アクセスは一覧へ誘導する。
 * Phase 3 で予想・実績つき詳細ページとして刷新予定。
 */
export default function RaceDetailRedirect() {
  redirect("/races");
}

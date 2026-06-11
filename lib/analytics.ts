/**
 * analytics.ts — GA4 イベント送信ユーティリティ
 * Data Analyst Result (Wave 2) のイベント定義に準拠
 * NEXT_PUBLIC_GA_ID が未設定の場合はコンソールログのみ (開発環境向け)
 */

/** gtag 関数の型定義 */
declare function gtag(
  command: "event",
  eventName: string,
  params?: Record<string, unknown>
): void;

/** gtag が利用可能か確認 */
function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof (window as Window & { gtag?: unknown }).gtag === "function";
}

/** イベント送信 (本番では gtag, 開発では console.log) */
function sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (isGtagAvailable()) {
    gtag("event", eventName, params);
  } else if (process.env.NODE_ENV === "development") {
    console.log("[GA4 Event]", eventName, params);
  }
}

/**
 * イベント1: レース一覧表示完了
 * トリガー: 一覧ページのデータ取得成功時
 */
export function trackViewRaceList(params: {
  date: string;
  races_count: number;
  has_predictions: boolean;
}): void {
  sendEvent("view_race_list", params);
}

/**
 * イベント2: レース詳細クリック
 * トリガー: レースカードのリンククリック時
 */
export function trackViewRaceDetail(params: {
  race_id: string;
  jyo_name: string;
  predicted_win_rate?: number | null;
}): void {
  sendEvent("view_race_detail", {
    race_id: params.race_id,
    jyo_name: params.jyo_name,
    predicted_win_rate: params.predicted_win_rate ?? null,
  });
}

/**
 * イベント3: CTA クリック
 * トリガー: 各種CTAボタン・リンクのクリック時
 */
export type CtaType = "view_prediction" | "view_result" | "explain_model" | "hero_cta" | "section_cta";

export function trackClickCta(params: {
  cta_type: CtaType;
  race_id?: string;
}): void {
  sendEvent("click_prediction_cta", params);
}

/**
 * イベント4: API呼び出しエラー
 * トリガー: APIリクエスト失敗時
 */
export function trackApiError(params: {
  endpoint: string;
  status_code: number;
  error_message: string;
  retry_count?: number;
}): void {
  sendEvent("api_call_error", {
    endpoint: params.endpoint,
    status_code: params.status_code,
    error_message: params.error_message,
    retry_count: params.retry_count ?? 0,
  });
}

/**
 * イベント5: AIモデル説明セクション閲覧
 * トリガー: スクロールで「AIの仕組み」セクション到達時
 */
export type SectionName = "how_it_works" | "accuracy_explanation" | "disclaimer";

export function trackModelExplanationViewed(params: {
  section_name: SectionName;
  scroll_depth: number;
}): void {
  sendEvent("model_explanation_viewed", params);
}

/**
 * イベント6: 的中実績検証クリック
 * トリガー: 外部検証リンク・実績ページへのクリック時
 */
export type VerificationType = "boatrace_official" | "this_site" | "export_data";

export function trackResultVerificationClicked(params: {
  verification_type: VerificationType;
}): void {
  sendEvent("result_verification_clicked", params);
}

/**
 * イベント7: SNSシェア意図
 * トリガー: シェアボタンクリック時
 */
export type SharePlatform = "twitter" | "line" | "email";
export type SharePage = "lp" | "race_detail" | "results";

export function trackShareIntent(params: {
  platform: SharePlatform;
  page: SharePage;
}): void {
  sendEvent("share_intent", params);
}

/**
 * イベント8: セッション時間マイルストーン
 * トリガー: 30秒ごとのインターバルで計測
 */
export function trackSessionMilestone(params: {
  duration_seconds: number;
  race_count_viewed: number;
  is_first_visit: boolean;
}): void {
  sendEvent("session_duration_milestone", params);
}

/**
 * イベント9: データ鮮度問題の検知
 * トリガー: 最終更新から30分超過時
 */
export type FreshnessIssueType = "stale_weather" | "stale_status" | "no_prediction";

export function trackDataFreshnessIssue(params: {
  issue_type: FreshnessIssueType;
  age_minutes: number;
}): void {
  sendEvent("data_freshness_issue", params);
}

/**
 * イベント10: 法的ページアクセス
 * トリガー: 免責・規約・プラポリ・運営者ページのロード時
 */
export type LegalPageType = "disclaimer" | "tos" | "privacy" | "operator";

export function trackLegalPageAccessed(params: {
  page_type: LegalPageType;
  from_page?: string;
}): void {
  sendEvent("legal_page_accessed", {
    page_type: params.page_type,
    from_page: params.from_page ?? "direct",
  });
}

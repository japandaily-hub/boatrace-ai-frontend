// ─── モックデータ (ローカル開発用) ──────────────────────────────
// NEXT_PUBLIC_API_BASE が未設定の場合にモック API がこのデータを返す

export type RaceStatus = "upcoming" | "open" | "closed" | "finished";

export interface Entry {
  entry_id: string;
  boat_no: number;          // 1-6
  racer_name: string;
  racer_no: string;         // 選手登録番号
  age: number;
  weight: number;           // kg
  class: string;            // A1/A2/B1/B2
  win_rate: number;         // 通算勝率
  local_win_rate: number;
  motor_no: number;
  motor_rate: number;       // モーター2連率
  boat_no_vessel: number;
  exhibition_time: number;  // 展示タイム（秒）
  avg_start_timing: number; // 平均ST（秒）
  predicted_st: number;     // AI予測ST
  predicted_win_rate: number; // AI予測1着確率
  recommended: boolean;
  rough_water_index?: number;
}

export interface Race {
  race_id: string;           // YYYYMMDD_JJ_RR
  date: string;              // YYYY-MM-DD
  jyo_cd: string;            // 01-24
  jyo_name: string;
  race_no: number;           // 1-12
  race_title: string;
  status: RaceStatus;
  scheduled_time: string;    // HH:MM
  grade: string;             // SG/G1/G2/G3/一般
  weather: string;
  wind_speed: number;        // m/s
  wind_direction: string;
  wave_height: number;       // cm
  temperature: number;       // °C
  rough_water_index: number; // 0-1
  tide_phase: string;
  entries: Entry[];
}

// ─── ベースエントリデータ ─────────────────────────────────────

const makeEntry = (
  raceId: string,
  boatNo: number,
  name: string,
  racerNo: string,
  cls: string,
  winRate: number,
  motorRate: number,
  exhTime: number,
  avgST: number,
  predST: number,
  predWin: number,
  recommended: boolean,
): Entry => ({
  entry_id: `${raceId}_${boatNo}`,
  boat_no: boatNo,
  racer_name: name,
  racer_no: racerNo,
  age: 30 + boatNo,
  weight: 50 + boatNo,
  class: cls,
  win_rate: winRate,
  local_win_rate: winRate - 0.3,
  motor_no: 70 + boatNo,
  motor_rate: motorRate,
  boat_no_vessel: 10 + boatNo,
  exhibition_time: exhTime,
  avg_start_timing: avgST,
  predicted_st: predST,
  predicted_win_rate: predWin,
  recommended,
  rough_water_index: 0.3,
});

// ─── モックレース一覧 ────────────────────────────────────────

export const MOCK_RACES: Race[] = [
  {
    race_id: "20260610_01_01",
    date: "2026-06-10",
    jyo_cd: "01",
    jyo_name: "桐生",
    race_no: 1,
    race_title: "第1レース",
    status: "finished",
    scheduled_time: "10:00",
    grade: "一般",
    weather: "晴れ",
    wind_speed: 3.5,
    wind_direction: "北",
    wave_height: 5,
    temperature: 24.0,
    rough_water_index: 0.12,
    tide_phase: "不明",
    entries: [
      makeEntry("20260610_01_01", 1, "田中 太郎", "4321", "A1", 7.2, 38.5, 6.72, 0.15, 0.14, 0.42, true),
      makeEntry("20260610_01_01", 2, "鈴木 次郎", "3210", "A2", 6.5, 35.2, 6.81, 0.17, 0.16, 0.22, false),
      makeEntry("20260610_01_01", 3, "佐藤 三郎", "5432", "A1", 6.8, 37.1, 6.76, 0.16, 0.15, 0.18, false),
      makeEntry("20260610_01_01", 4, "高橋 四郎", "2109", "B1", 5.9, 30.8, 6.89, 0.19, 0.18, 0.09, false),
      makeEntry("20260610_01_01", 5, "伊藤 五郎", "6543", "A2", 6.2, 33.4, 6.84, 0.18, 0.17, 0.06, false),
      makeEntry("20260610_01_01", 6, "渡辺 六郎", "1098", "B2", 5.4, 28.6, 6.95, 0.21, 0.20, 0.03, false),
    ],
  },
  {
    race_id: "20260610_01_02",
    date: "2026-06-10",
    jyo_cd: "01",
    jyo_name: "桐生",
    race_no: 2,
    race_title: "第2レース",
    status: "closed",
    scheduled_time: "10:35",
    grade: "一般",
    weather: "晴れ",
    wind_speed: 4.0,
    wind_direction: "北東",
    wave_height: 8,
    temperature: 24.5,
    rough_water_index: 0.20,
    tide_phase: "不明",
    entries: [
      makeEntry("20260610_01_02", 1, "中村 一郎", "4100", "A2", 6.7, 36.0, 6.79, 0.16, 0.15, 0.35, true),
      makeEntry("20260610_01_02", 2, "小林 二郎", "3300", "A1", 7.1, 39.2, 6.74, 0.14, 0.13, 0.28, false),
      makeEntry("20260610_01_02", 3, "加藤 三郎", "5500", "B1", 5.8, 31.5, 6.90, 0.20, 0.19, 0.15, false),
      makeEntry("20260610_01_02", 4, "吉田 四郎", "2200", "A2", 6.3, 34.8, 6.83, 0.17, 0.16, 0.12, false),
      makeEntry("20260610_01_02", 5, "山田 五郎", "6600", "B2", 5.5, 29.3, 6.93, 0.22, 0.21, 0.07, false),
      makeEntry("20260610_01_02", 6, "松本 六郎", "1100", "B1", 5.9, 32.1, 6.87, 0.19, 0.18, 0.03, false),
    ],
  },
  {
    race_id: "20260610_01_03",
    date: "2026-06-10",
    jyo_cd: "01",
    jyo_name: "桐生",
    race_no: 3,
    race_title: "第3レース",
    status: "open",
    scheduled_time: "11:10",
    grade: "一般",
    weather: "晴れ",
    wind_speed: 2.8,
    wind_direction: "南",
    wave_height: 4,
    temperature: 25.0,
    rough_water_index: 0.08,
    tide_phase: "不明",
    entries: [
      makeEntry("20260610_01_03", 1, "井上 一男", "4400", "A1", 7.4, 40.1, 6.70, 0.13, 0.12, 0.48, true),
      makeEntry("20260610_01_03", 2, "木村 二男", "3400", "A2", 6.6, 35.5, 6.80, 0.16, 0.15, 0.20, false),
      makeEntry("20260610_01_03", 3, "林 三男", "5400", "B1", 5.7, 30.2, 6.92, 0.20, 0.19, 0.14, false),
      makeEntry("20260610_01_03", 4, "清水 四男", "2400", "A2", 6.4, 34.0, 6.82, 0.18, 0.17, 0.10, false),
      makeEntry("20260610_01_03", 5, "山口 五男", "6400", "B2", 5.6, 29.0, 6.94, 0.21, 0.20, 0.05, false),
      makeEntry("20260610_01_03", 6, "池田 六男", "1400", "B1", 6.0, 32.8, 6.86, 0.19, 0.18, 0.03, false),
    ],
  },
  {
    race_id: "20260610_04_01",
    date: "2026-06-10",
    jyo_cd: "04",
    jyo_name: "平和島",
    race_no: 1,
    race_title: "第1レース",
    status: "upcoming",
    scheduled_time: "11:40",
    grade: "G3",
    weather: "曇り",
    wind_speed: 5.2,
    wind_direction: "西",
    wave_height: 15,
    temperature: 22.5,
    rough_water_index: 0.45,
    tide_phase: "上げ潮",
    entries: [
      makeEntry("20260610_04_01", 1, "福田 一男", "4550", "A1", 7.6, 41.2, 6.68, 0.12, 0.11, 0.38, true),
      makeEntry("20260610_04_01", 2, "岡田 二男", "3550", "A1", 7.0, 38.8, 6.75, 0.15, 0.14, 0.25, false),
      makeEntry("20260610_04_01", 3, "長谷川 三男", "5550", "A2", 6.5, 35.6, 6.80, 0.17, 0.16, 0.18, false),
      makeEntry("20260610_04_01", 4, "石川 四男", "2550", "B1", 5.8, 31.2, 6.91, 0.20, 0.19, 0.11, false),
      makeEntry("20260610_04_01", 5, "村田 五男", "6550", "A2", 6.3, 34.2, 6.83, 0.18, 0.17, 0.05, false),
      makeEntry("20260610_04_01", 6, "森 六男", "1550", "B2", 5.3, 28.1, 6.97, 0.23, 0.22, 0.03, false),
    ],
  },
];

// ─── ヘルパー関数 ────────────────────────────────────────────

export function getRacesByDate(date: string): Race[] {
  return MOCK_RACES.filter((r) => r.date === date);
}

export function getRaceById(raceId: string): Race | undefined {
  return MOCK_RACES.find((r) => r.race_id === raceId);
}

/** 今日の日付を YYYY-MM-DD 形式で返す */
export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

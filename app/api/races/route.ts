import { NextRequest, NextResponse } from "next/server";
import { getRacesByDate, todayStr, MOCK_RACES } from "@/lib/mock_data";

// GET /api/races?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? todayStr();

  let races = getRacesByDate(date);

  // 指定日のデータがなければ全件からサンプル返却（開発便宜）
  if (races.length === 0) {
    races = MOCK_RACES.map((r) => ({
      ...r,
      date,
      race_id: r.race_id.replace(/^\d{8}/, date.replace(/-/g, "")),
    }));
  }

  // entries は一覧では省略（軽量化）
  const summary = races.map(({ entries: _, ...r }) => ({
    ...r,
    entry_count: _.length,
    top_pick: _.find((e) => e.recommended)?.racer_name ?? null,
    top_predicted_win: Math.max(..._.map((e) => e.predicted_win_rate)),
  }));

  return NextResponse.json({ date, races: summary });
}

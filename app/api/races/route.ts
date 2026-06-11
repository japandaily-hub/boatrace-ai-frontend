import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://sxhxd2rkyl.execute-api.ap-northeast-1.amazonaws.com/prod";

// GET /api/races?date=YYYY-MM-DD
// バックエンドAPIへのプロキシ。NEXT_PUBLIC_API_BASE が設定されている場合に有効。
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  try {
    const res = await fetch(`${API_BASE}/api/races?date=${date}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "API request failed", races: [] },
      { status: 502 }
    );
  }
}

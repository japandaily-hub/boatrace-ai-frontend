import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://sxhxd2rkyl.execute-api.ap-northeast-1.amazonaws.com/prod";

// GET /api/race/:race_id
// バックエンドAPIへのプロキシ
export async function GET(
  _req: NextRequest,
  { params }: { params: { race_id: string } },
) {
  const { race_id } = params;

  try {
    const res = await fetch(`${API_BASE}/api/race/${race_id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "API request failed" },
      { status: 502 }
    );
  }
}

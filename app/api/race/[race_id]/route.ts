import { NextRequest, NextResponse } from "next/server";
import { getRaceById, MOCK_RACES } from "@/lib/mock_data";

// GET /api/race/:race_id
export async function GET(
  _req: NextRequest,
  { params }: { params: { race_id: string } },
) {
  const { race_id } = params;
  let race = getRaceById(race_id);

  // 存在しないIDなら先頭レースをサンプルとして返却（開発便宜）
  if (!race) {
    race = { ...MOCK_RACES[0], race_id };
  }

  return NextResponse.json(race);
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ─── 型定義 ───────────────────────────────────────────────────

interface Entry {
  entry_id: string;
  boat_no: number;
  racer_name: string;
  racer_no: string;
  age: number;
  weight: number;
  class: string;
  win_rate: number;
  local_win_rate: number;
  motor_no: number;
  motor_rate: number;
  boat_no_vessel: number;
  exhibition_time: number;
  avg_start_timing: number;
  predicted_st: number;
  predicted_win_rate: number;
  recommended: boolean;
  rough_water_index?: number;
}

interface Race {
  race_id: string;
  date: string;
  jyo_cd: string;
  jyo_name: string;
  race_no: number;
  race_title: string;
  status: string;
  scheduled_time: string;
  grade: string;
  weather: string;
  wind_speed: number;
  wind_direction: string;
  wave_height: number;
  temperature: number;
  rough_water_index: number;
  tide_phase: string;
  entries: Entry[];
}

// ─── 定数 ────────────────────────────────────────────────────

const BOAT_COLORS = ["", "#e5e7eb", "#374151", "#ef4444", "#3b82f6", "#eab308", "#22c55e"];
const BOAT_BG    = ["", "bg-white text-black", "bg-gray-700", "bg-red-600", "bg-blue-600", "bg-yellow-500 text-black", "bg-green-600"];
const CLASS_COLOR: Record<string, string> = {
  A1: "text-yellow-300 font-bold",
  A2: "text-orange-300",
  B1: "text-slate-300",
  B2: "text-slate-500",
};

// ─── サブコンポーネント ────────────────────────────────────────

function BoatBadge({ no }: { no: number }) {
  return (
    <span className={clsx("inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold", BOAT_BG[no])}>
      {no}
    </span>
  );
}

/** アイアンゲージ（ST予測バー） */
function IronGauge({ predicted, avg }: { predicted: number; avg: number }) {
  const BAR_MAX = 0.35; // 表示上限（秒）
  const pPct = Math.min((predicted / BAR_MAX) * 100, 100);
  const aPct = Math.min((avg / BAR_MAX) * 100, 100);
  const color = predicted < 0.12 ? "bg-green-400" : predicted < 0.18 ? "bg-sky-400" : "bg-slate-400";

  return (
    <div className="relative h-2 w-full rounded-full bg-slate-700">
      {/* 実績平均（グレー縦線） */}
      <div className="absolute top-0 h-full w-0.5 bg-slate-500" style={{ left: `${aPct}%` }} />
      {/* AI予測（色付き） */}
      <div className={clsx("h-full rounded-full", color)} style={{ width: `${pPct}%` }} />
    </div>
  );
}

/** スタート展示フォーメーション */
function StartFormation({ entries }: { entries: Entry[] }) {
  const sorted = [...entries].sort((a, b) => a.predicted_st - b.predicted_st);
  return (
    <div className="space-y-1">
      {sorted.map((e, i) => (
        <div key={e.boat_no} className="flex items-center gap-2">
          <span className="w-4 text-xs text-slate-500">{i + 1}</span>
          <BoatBadge no={e.boat_no} />
          <IronGauge predicted={e.predicted_st} avg={e.avg_start_timing} />
          <span className="w-12 text-right text-xs tabular-nums text-slate-300">
            {e.predicted_st.toFixed(3)}s
          </span>
        </div>
      ))}
    </div>
  );
}

/** レーダーチャート（各艇の総合評価） */
function RadarSection({ entries }: { entries: Entry[] }) {
  // 正規化 (0-100)
  const normalize = (v: number, min: number, max: number) =>
    Math.round(((v - min) / (max - min)) * 100);

  const allWin = entries.map((e) => e.win_rate);
  const allMotor = entries.map((e) => e.motor_rate);
  const allExh = entries.map((e) => e.exhibition_time);

  const data = entries.map((e) => ({
    name: `${e.boat_no}号`,
    勝率: normalize(e.win_rate, Math.min(...allWin), Math.max(...allWin)),
    モーター: normalize(e.motor_rate, Math.min(...allMotor), Math.max(...allMotor)),
    展示: normalize(Math.max(...allExh) - e.exhibition_time + Math.min(...allExh), Math.min(...allExh), Math.max(...allExh)),
    予測ST: normalize(Math.max(...entries.map((ee) => ee.predicted_st)) - e.predicted_st, 0, 0.3) + 40,
    AI予測: Math.round(e.predicted_win_rate * 100),
  }));

  const radarDims = ["勝率", "モーター", "展示", "予測ST", "AI予測"];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {entries.map((e) => {
        const d = data.find((x) => x.name === `${e.boat_no}号`)!;
        const radarData = radarDims.map((dim) => ({
          subject: dim,
          value: d[dim as keyof typeof d] as number,
        }));

        return (
          <div key={e.boat_no} className="rounded-lg bg-slate-800 p-2">
            <div className="mb-1 flex items-center gap-1.5">
              <BoatBadge no={e.boat_no} />
              <span className="text-xs text-slate-300">{e.racer_name}</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <RadarChart data={radarData} margin={{ top: 4, right: 16, bottom: 4, left: 16 }}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#94a3b8" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  dataKey="value"
                  stroke={BOAT_COLORS[e.boat_no]}
                  fill={BOAT_COLORS[e.boat_no]}
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}

/** 予測勝率バーチャート */
function WinRateChart({ entries }: { entries: Entry[] }) {
  const data = entries.map((e) => ({
    name: `${e.boat_no}号`,
    value: Math.round(e.predicted_win_rate * 100),
    color: BOAT_COLORS[e.boat_no],
  }));

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} />
        <YAxis
          unit="%"
          domain={[0, 60]}
          tick={{ fontSize: 10, fill: "#64748b" }}
          width={32}
        />
        <Tooltip
          formatter={(v) => [`${v}%`, "AI予測勝率"]}
          contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, fontSize: 12 }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Bar dataKey="value" radius={[3, 3, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/** 選手カード */
function BoatCard({ entry }: { entry: Entry }) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-l-4 border-slate-700 bg-slate-800 p-3",
        entry.recommended && "ring-1 ring-sky-500",
      )}
      style={{ borderLeftColor: BOAT_COLORS[entry.boat_no] }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <BoatBadge no={entry.boat_no} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-white">{entry.racer_name}</span>
              {entry.recommended && (
                <span className="rounded bg-sky-900 px-1.5 py-0.5 text-[10px] text-sky-300">AI推奨</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className={CLASS_COLOR[entry.class]}>{entry.class}</span>
              <span>{entry.racer_no}</span>
              <span>{entry.age}歳/{entry.weight}kg</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-sky-300">
            {(entry.predicted_win_rate * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-slate-500">予測勝率</div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <div className="text-slate-500">通算勝率</div>
          <div className="text-white">{entry.win_rate.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-slate-500">モーター</div>
          <div className="text-white">{entry.motor_rate.toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-slate-500">展示タイム</div>
          <div className="text-white">{entry.exhibition_time.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-2">
        <div className="mb-0.5 flex justify-between text-xs text-slate-500">
          <span>ST予測</span>
          <span>{entry.predicted_st.toFixed(3)}s</span>
        </div>
        <IronGauge predicted={entry.predicted_st} avg={entry.avg_start_timing} />
      </div>
    </div>
  );
}

/** 天候・水面コンディション */
function ConditionPanel({ race }: { race: Race }) {
  const rwi = race.rough_water_index;
  const color =
    rwi < 0.2 ? "text-green-400"
    : rwi < 0.4 ? "text-lime-400"
    : rwi < 0.6 ? "text-yellow-400"
    : rwi < 0.8 ? "text-orange-400"
    : "text-red-400";

  return (
    <div className="grid grid-cols-4 gap-3 rounded-lg bg-slate-800 p-4 text-center text-sm">
      <div>
        <div className="text-slate-500 text-xs">天候</div>
        <div className="text-white font-medium">{race.weather}</div>
      </div>
      <div>
        <div className="text-slate-500 text-xs">風速/向き</div>
        <div className="text-white">{race.wind_speed}m {race.wind_direction}</div>
      </div>
      <div>
        <div className="text-slate-500 text-xs">波高/潮</div>
        <div className="text-white">{race.wave_height}cm {race.tide_phase}</div>
      </div>
      <div>
        <div className="text-slate-500 text-xs">荒水指数</div>
        <div className={clsx("font-bold", color)}>{(rwi * 100).toFixed(0)}</div>
      </div>
    </div>
  );
}

// ─── メインページ ────────────────────────────────────────────

export default function RaceDetailPage() {
  const params = useParams<{ race_id: string }>();
  const raceId = params.race_id;

  const [race, setRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRace = useCallback(async () => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE;
      const url = apiBase
        ? `${apiBase}/api/race/${raceId}`
        : `/api/race/${raceId}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRace(data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [raceId]);

  useEffect(() => { fetchRace(); }, [fetchRace]);

  // 30秒ポーリング
  useEffect(() => {
    const timer = setInterval(fetchRace, 30_000);
    return () => clearInterval(timer);
  }, [fetchRace]);

  if (loading) return <div className="py-20 text-center text-slate-400">読み込み中…</div>;
  if (error)   return <div className="rounded-lg bg-red-950 p-4 text-red-300">エラー: {error}</div>;
  if (!race)   return null;

  const recommended = race.entries.filter((e) => e.recommended);
  const sortedByWin  = [...race.entries].sort((a, b) => b.predicted_win_rate - a.predicted_win_rate);

  return (
    <div className="space-y-6">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <a href="/" className="hover:text-white">レース一覧</a>
        <span>›</span>
        <span className="text-white">{race.jyo_name} {race.race_no}R</span>
        <span className="ml-auto text-xs text-slate-600">{race.race_id}</span>
      </div>

      {/* ヘッダー */}
      <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-white">
            {race.jyo_name} {race.race_no}R
          </h1>
          <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
            {race.grade}
          </span>
          <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
            {race.scheduled_time}
          </span>
        </div>

        {/* コンディション */}
        <div className="mt-4">
          <ConditionPanel race={race} />
        </div>
      </div>

      {/* AI推奨 */}
      {recommended.length > 0 && (
        <div className="rounded-lg border border-sky-800 bg-sky-950/40 p-4">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-sky-300">
            <span>🤖</span> AI推奨選手
          </h2>
          <div className="flex flex-wrap gap-3">
            {recommended.map((e) => (
              <div key={e.boat_no} className="flex items-center gap-2 rounded-lg bg-sky-900/50 px-3 py-2">
                <BoatBadge no={e.boat_no} />
                <div>
                  <div className="text-sm font-medium text-white">{e.racer_name}</div>
                  <div className="text-xs text-sky-300">
                    予測勝率 {(e.predicted_win_rate * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 予測勝率チャート */}
      <div className="rounded-lg bg-slate-800 p-4">
        <h2 className="mb-3 font-semibold text-slate-200">AI予測勝率</h2>
        <WinRateChart entries={race.entries} />
      </div>

      {/* スタート展示 */}
      <div className="rounded-lg bg-slate-800 p-4">
        <h2 className="mb-3 font-semibold text-slate-200">スタート予測フォーメーション</h2>
        <StartFormation entries={race.entries} />
        <p className="mt-2 text-xs text-slate-500">
          ▪ バー: AI予測ST（秒）　▪ 縦線: 実績平均ST
        </p>
      </div>

      {/* 選手カード一覧 */}
      <div>
        <h2 className="mb-3 font-semibold text-slate-200">出走選手 (AI予測順)</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {sortedByWin.map((entry) => (
            <BoatCard key={entry.boat_no} entry={entry} />
          ))}
        </div>
      </div>

      {/* レーダーチャート */}
      <div className="rounded-lg bg-slate-800 p-4">
        <h2 className="mb-3 font-semibold text-slate-200">総合評価レーダー</h2>
        <RadarSection entries={race.entries} />
      </div>

      {/* 更新ボタン */}
      <div className="text-right text-xs text-slate-600">
        30秒ごとに自動更新 ·{" "}
        <button onClick={fetchRace} className="hover:text-slate-400">
          今すぐ更新
        </button>
      </div>
    </div>
  );
}

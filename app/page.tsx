"use client";

import { useEffect, useState, useCallback } from "react";
import { format, addDays, parseISO } from "date-fns";
import clsx from "clsx";

// ─── 型定義 ───────────────────────────────────────────────────

type RaceStatus = "upcoming" | "open" | "closed" | "finished";

interface RaceSummary {
  race_id: string;
  date: string;
  jyo_cd: string;
  jyo_name: string;
  race_no: number;
  race_title: string;
  status: RaceStatus;
  scheduled_time: string;
  grade: string;
  weather: string;
  wind_speed: number;
  wave_height: number;
  rough_water_index: number;
  tide_phase: string;
  entry_count: number;
  top_pick: string | null;
  top_predicted_win: number;
}

// ─── 定数 ────────────────────────────────────────────────────

const STATUS_LABEL: Record<RaceStatus, string> = {
  upcoming: "発売前",
  open:     "発売中",
  closed:   "締切",
  finished: "確定",
};

const STATUS_COLOR: Record<RaceStatus, string> = {
  upcoming: "bg-slate-600 text-slate-200",
  open:     "bg-green-700 text-green-100",
  closed:   "bg-amber-700 text-amber-100",
  finished: "bg-slate-700 text-slate-300",
};

const GRADE_COLOR: Record<string, string> = {
  SG:   "text-yellow-300 font-bold",
  G1:   "text-orange-300 font-bold",
  G2:   "text-sky-300",
  G3:   "text-teal-300",
  "一般": "text-slate-400",
};

// ─── サブコンポーネント ────────────────────────────────────────

function DateNav({
  date,
  onChange,
}: {
  date: string;
  onChange: (d: string) => void;
}) {
  const d = parseISO(date);
  const days = Array.from({ length: 7 }, (_, i) => addDays(d, i - 3));

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      <button
        onClick={() => onChange(format(addDays(d, -1), "yyyy-MM-dd"))}
        className="shrink-0 rounded p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
      >
        ‹
      </button>
      {days.map((day) => {
        const str = format(day, "yyyy-MM-dd");
        const active = str === date;
        return (
          <button
            key={str}
            onClick={() => onChange(str)}
            className={clsx(
              "shrink-0 rounded px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-sky-600 text-white"
                : "text-slate-400 hover:bg-slate-700 hover:text-white",
            )}
          >
            <div className="text-xs">{format(day, "M/d")}</div>
            <div className="text-[10px] leading-none text-slate-400">
              {["日", "月", "火", "水", "木", "金", "土"][day.getDay()]}
            </div>
          </button>
        );
      })}
      <button
        onClick={() => onChange(format(addDays(d, 1), "yyyy-MM-dd"))}
        className="shrink-0 rounded p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
      >
        ›
      </button>
    </div>
  );
}

function WaveIndex({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color =
    value < 0.2 ? "bg-green-500"
    : value < 0.4 ? "bg-lime-500"
    : value < 0.6 ? "bg-yellow-500"
    : value < 0.8 ? "bg-orange-500"
    : "bg-red-500";
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-700">
        <div className={clsx("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-400">{pct}</span>
    </div>
  );
}

function RaceCard({ race }: { race: RaceSummary }) {
  return (
    <a
      href={`/race/${race.race_id}`}
      className={clsx(
        "block rounded-lg border border-slate-700 bg-slate-800 p-4",
        "hover:border-sky-500 hover:bg-slate-750 transition-colors",
        race.status === "finished" && "opacity-70",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        {/* 左カラム */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-white">
              {race.jyo_name} {race.race_no}R
            </span>
            <span className={clsx("text-xs", GRADE_COLOR[race.grade] ?? "text-slate-400")}>
              {race.grade}
            </span>
            <span
              className={clsx(
                "rounded px-1.5 py-0.5 text-xs",
                STATUS_COLOR[race.status],
              )}
            >
              {STATUS_LABEL[race.status]}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
            <span>{race.scheduled_time}</span>
            <span>{race.weather}</span>
            <span>風 {race.wind_speed}m</span>
            <span>波 {race.wave_height}cm</span>
          </div>

          {race.top_pick && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-xs text-slate-500">AI推奨</span>
              <span className="rounded bg-sky-900 px-2 py-0.5 text-xs text-sky-200">
                {race.top_pick}
              </span>
              <span className="text-xs text-slate-400">
                {(race.top_predicted_win * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>

        {/* 右カラム: 荒水指数 */}
        <div className="shrink-0 text-right">
          <div className="text-xs text-slate-500 mb-1">荒水指数</div>
          <WaveIndex value={race.rough_water_index} />
          {race.tide_phase && race.tide_phase !== "不明" && (
            <div className="mt-0.5 text-xs text-slate-500">{race.tide_phase}</div>
          )}
        </div>
      </div>
    </a>
  );
}

function SummaryBar({ races }: { races: RaceSummary[] }) {
  const open = races.filter((r) => r.status === "open").length;
  const upcoming = races.filter((r) => r.status === "upcoming").length;
  const finished = races.filter((r) => r.status === "finished").length;
  const venues = [...new Set(races.map((r) => r.jyo_name))];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg bg-slate-800 px-4 py-2 text-sm">
      <span className="text-slate-400">
        {venues.length > 0 ? venues.join("・") : "—"}
      </span>
      <span className="ml-auto flex gap-3 text-xs">
        <span className="text-green-400">発売中 {open}</span>
        <span className="text-slate-400">発売前 {upcoming}</span>
        <span className="text-slate-500">確定 {finished}</span>
        <span className="text-slate-400">計 {races.length}R</span>
      </span>
    </div>
  );
}

// ─── メインページ ────────────────────────────────────────────

export default function HomePage() {
  const [date, setDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [races, setRaces] = useState<RaceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRaces = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/races?date=${date}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRaces(data.races ?? []);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [date]);

  // 日付変更時 or 初回
  useEffect(() => {
    fetchRaces();
  }, [fetchRaces]);

  // 5分ごとにポーリング
  useEffect(() => {
    const timer = setInterval(fetchRaces, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, [fetchRaces]);

  const [filterStatus, setFilterStatus] = useState<RaceStatus | "all">("all");
  const filtered =
    filterStatus === "all" ? races : races.filter((r) => r.status === filterStatus);

  return (
    <div className="space-y-4">
      {/* 日付ナビ */}
      <DateNav date={date} onChange={setDate} />

      {/* サマリーバー */}
      {races.length > 0 && <SummaryBar races={races} />}

      {/* フィルター */}
      <div className="flex items-center gap-2">
        {(["all", "open", "upcoming", "closed", "finished"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={clsx(
              "rounded px-3 py-1 text-xs transition-colors",
              filterStatus === s
                ? "bg-sky-700 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700",
            )}
          >
            {s === "all" ? "すべて" : STATUS_LABEL[s]}
          </button>
        ))}
        <button
          onClick={fetchRaces}
          className="ml-auto text-xs text-slate-500 hover:text-slate-300"
        >
          ↻ 更新
        </button>
      </div>

      {/* コンテンツ */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">読み込み中…</div>
      ) : error ? (
        <div className="rounded-lg bg-red-950 p-4 text-sm text-red-300">
          エラー: {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          {date} のレースデータがありません
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((race) => (
            <RaceCard key={race.race_id} race={race} />
          ))}
        </div>
      )}
    </div>
  );
}

import { format } from "date-fns";

/** Tropical calendar season, the dates people actually mean by Capricorn. */
const INGRESS_MONTH = 11;
const INGRESS_DAY = 22;
const CLOSE_MONTH = 0;
const CLOSE_DAY = 19;

const MARK_KEY = "capricorn-mark";

export type PhaseKind = "approaching" | "in-season";

export type Phase = {
  kind: PhaseKind;
  target: Date;
  seasonStart: Date;
  seasonEnd: Date;
};

export type Mark = {
  iso: string;
  name: string;
};

export type ClockMode = "sky" | "mark";

export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function atDay(year: number, month: number, day: number, end = false): Date {
  return end
    ? new Date(year, month, day, 23, 59, 59, 999)
    : new Date(year, month, day, 0, 0, 0, 0);
}

export function seasonAround(now: Date): { start: Date; end: Date } {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  if (month === CLOSE_MONTH && day <= CLOSE_DAY) {
    return {
      start: atDay(year - 1, INGRESS_MONTH, INGRESS_DAY),
      end: atDay(year, CLOSE_MONTH, CLOSE_DAY, true),
    };
  }

  if (month === INGRESS_MONTH && day >= INGRESS_DAY) {
    return {
      start: atDay(year, INGRESS_MONTH, INGRESS_DAY),
      end: atDay(year + 1, CLOSE_MONTH, CLOSE_DAY, true),
    };
  }

  return {
    start: atDay(year, INGRESS_MONTH, INGRESS_DAY),
    end: atDay(year + 1, CLOSE_MONTH, CLOSE_DAY, true),
  };
}

export function skyPhase(now: Date): Phase {
  const { start, end } = seasonAround(now);
  if (now.getTime() >= start.getTime() && now.getTime() <= end.getTime()) {
    return { kind: "in-season", target: end, seasonStart: start, seasonEnd: end };
  }
  return { kind: "approaching", target: start, seasonStart: start, seasonEnd: end };
}

export function approachOpened(seasonStart: Date): Date {
  return atDay(seasonStart.getFullYear(), CLOSE_MONTH, CLOSE_DAY + 1);
}

export function seasonProgress(now: Date, phase: Phase): number {
  const start =
    phase.kind === "in-season" ? phase.seasonStart : approachOpened(phase.seasonStart);
  const end = phase.kind === "in-season" ? phase.seasonEnd : phase.seasonStart;
  const span = end.getTime() - start.getTime();
  if (span <= 0) return 0;
  return clamp((now.getTime() - start.getTime()) / span);
}

export function remainingUntil(target: Date, now: Date): Remaining {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export function readMark(): Mark | null {
  try {
    const raw = localStorage.getItem(MARK_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Mark>;
    if (typeof parsed.iso !== "string") return null;
    const when = new Date(parsed.iso);
    if (Number.isNaN(when.getTime())) return null;
    const name = typeof parsed.name === "string" ? parsed.name.slice(0, 48) : "";
    return { iso: parsed.iso, name };
  } catch {
    return null;
  }
}

export function writeMark(mark: Mark | null) {
  if (!mark) {
    localStorage.removeItem(MARK_KEY);
    return;
  }
  localStorage.setItem(MARK_KEY, JSON.stringify({ iso: mark.iso, name: mark.name.slice(0, 48) }));
}

export function resolveClock(now: Date, mark: Mark | null) {
  const phase = skyPhase(now);
  if (mark) {
    const when = new Date(mark.iso);
    if (when.getTime() > now.getTime()) {
      const name = mark.name.trim() || "Your hour";
      return { mode: "mark" as const, phase, target: when, name };
    }
  }
  return {
    mode: "sky" as const,
    phase,
    target: phase.target,
    name: phase.kind === "in-season" ? "Until the season closes" : "Until the Sun enters Capricorn",
  };
}

export function narrative(mode: ClockMode, phase: Phase) {
  if (mode === "mark") {
    return {
      deck: "A private hour, kept against the stars.",
      caption: "Your clock",
    };
  }
  if (phase.kind === "in-season") {
    return {
      deck: "The gate is open. Hold the height you earned.",
      caption: "Capricorn, moving through",
    };
  }
  return {
    deck: "The sea-goat is still climbing toward the winter gate.",
    caption: "The year, closing on the gate",
  };
}

export function formatTarget(date: Date, mode: ClockMode) {
  return mode === "mark" ? format(date, "d MMMM yyyy · HH:mm") : format(date, "d MMMM yyyy");
}

export function toLocalInput(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

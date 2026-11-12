import { useEffect, useState, type FormEvent, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { CalendarClock, RotateCcw } from "lucide-react";
import CountdownBackground from "@/components/CountdownBackground";
import Constellation from "@/components/Constellation";
import {
  formatTarget,
  narrative,
  readMark,
  remainingUntil,
  resolveClock,
  seasonProgress,
  skyPhase,
  toLocalInput,
  writeMark,
  type Mark,
} from "@/lib/capricorn";

const TRAITS = [
  { title: "Ambition", line: "The long ascent" },
  { title: "Discipline", line: "Saturn's measure" },
  { title: "Legacy", line: "What the climb keeps" },
];

const rise = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function CapricornCountdown() {
  const reduce = useReducedMotion();
  const [now, setNow] = useState<Date | null>(null);
  const [mark, setMark] = useState<Mark | null>(null);
  const [open, setOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [whenInput, setWhenInput] = useState("");
  const [error, setError] = useState("");

  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const skyX = useSpring(shiftX, { stiffness: 28, damping: 18, mass: 0.7 });
  const skyY = useSpring(shiftY, { stiffness: 28, damping: 18, mass: 0.7 });

  useEffect(() => {
    const clockNow = new Date();
    const stored = readMark();
    const fresh = stored && new Date(stored.iso).getTime() > clockNow.getTime() ? stored : null;
    if (stored && !fresh) writeMark(null);
    setMark(fresh);
    setNameInput(fresh?.name ?? "");
    setWhenInput(toLocalInput(fresh ? new Date(fresh.iso) : skyPhase(clockNow).seasonStart));
    setNow(clockNow);

    let timer = 0;
    const tick = () => {
      setNow(new Date());
      timer = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    timer = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    return () => window.clearTimeout(timer);
  }, []);

  function onMove(event: PointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    shiftX.set(px * 16);
    shiftY.set(py * 10);
  }

  function onLeave() {
    shiftX.set(0);
    shiftY.set(0);
  }

  function onSave(event: FormEvent) {
    event.preventDefault();
    const when = new Date(whenInput);
    if (Number.isNaN(when.getTime()) || when.getTime() <= Date.now()) {
      setError("Choose an hour that has not passed.");
      return;
    }
    const next = { iso: when.toISOString(), name: nameInput.trim().slice(0, 48) };
    writeMark(next);
    setMark(next);
    setError("");
    setOpen(false);
  }

  function onSky() {
    writeMark(null);
    setMark(null);
    setNameInput("");
    setError("");
    if (now) setWhenInput(toLocalInput(skyPhase(now).seasonStart));
    setOpen(false);
  }

  const clock = now ? resolveClock(now, mark) : null;
  const parts = clock && now ? remainingUntil(clock.target, now) : null;
  const copy = clock ? narrative(clock.mode, clock.phase) : null;
  const progress = clock && now && clock.mode === "sky" ? seasonProgress(now, clock.phase) : null;
  const spoken = parts
    ? `${parts.days} days, ${parts.hours} hours, and ${parts.minutes} minutes. ${clock?.name ?? ""}`
    : "Counting toward Capricorn.";

  return (
    <main
      className="relative z-10 flex min-h-dvh flex-col"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <CountdownBackground />
      <p className="sr-only" aria-live="polite">
        {spoken}
      </p>

      <div className="relative flex min-h-56 flex-1 items-center justify-center px-6 pt-16">
        <motion.div style={{ x: skyX, y: skyY }} className="w-full max-w-lg">
          <div className={reduce ? undefined : "sky-drift"}>
            <Constellation />
          </div>
        </motion.div>
      </div>

      <section className="relative border-t border-line bg-ink/75 px-5 pt-8 pb-24 backdrop-blur-md sm:px-10">
        <motion.div
          className="mx-auto flex w-full max-w-3xl flex-col gap-8"
          initial={reduce ? "show" : "hidden"}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
        >
          <motion.header variants={rise} className="flex flex-col gap-3">
            <p className="text-xs tracking-widest text-gold uppercase">Saturn · Earth · Cardinal</p>
            <h1 className="font-display text-6xl leading-none font-medium text-ivory sm:text-8xl">
              Capricorn
            </h1>
            <p className="max-w-xl font-display text-xl text-stone italic sm:text-2xl text-balance">
              {copy?.deck ?? "The sea-goat keeps the winter gate."}
            </p>
          </motion.header>

          <motion.div variants={rise} className="flex flex-col gap-4">
            <p className="text-sm tracking-wide text-ivory">{clock?.name ?? "The winter gate"}</p>
            <ol aria-hidden="true" className="grid grid-cols-4 gap-2 sm:gap-4">
              <Unit label="Days" value={parts?.days} />
              <Unit label="Hours" value={parts?.hours} />
              <Unit label="Min" value={parts?.minutes} />
              <Unit label="Sec" value={parts?.seconds} />
            </ol>
            <p className="text-sm text-stone">
              {clock ? formatTarget(clock.target, clock.mode) : "22 December"}
            </p>
          </motion.div>

          {progress !== null && copy ? (
            <motion.div variants={rise} className="flex flex-col gap-3">
              <div
                className="h-px w-full bg-line"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                aria-label={copy.caption}
              >
                <div
                  className="h-px bg-gold transition-[width] duration-700 ease-out"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="text-xs tracking-widest text-stone uppercase">{copy.caption}</p>
            </motion.div>
          ) : null}

          <motion.ul variants={rise} className="grid grid-cols-3 gap-3 border-t border-line pt-6">
            {TRAITS.map((trait) => (
              <li key={trait.title} className="min-w-0">
                <p className="text-sm text-ivory">{trait.title}</p>
                <p className="mt-1 text-xs text-stone">{trait.line}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={rise} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <button type="button" className="ghost-btn" onClick={() => setOpen((v) => !v)}>
                <CalendarClock className="size-4" aria-hidden="true" />
                {open ? "Close" : mark ? "Edit the hour" : "Mark an hour"}
              </button>
              {mark ? (
                <button type="button" className="ghost-btn" onClick={onSky}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Return to the sky
                </button>
              ) : null}
            </div>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={open ? undefined : true}>
                <form onSubmit={onSave} className="flex flex-col gap-4 border border-line p-4">
                  <label className="flex flex-col gap-2 text-xs tracking-widest text-stone uppercase">
                    Name
                    <input
                      value={nameInput}
                      onChange={(event) => setNameInput(event.target.value)}
                      maxLength={48}
                      placeholder="Birthday, launch, return"
                      className="h-11 w-full min-w-0 border border-line bg-ink px-3 text-sm tracking-normal text-ivory normal-case placeholder:text-stone"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-xs tracking-widest text-stone uppercase">
                    Hour
                    <input
                      type="datetime-local"
                      required
                      value={whenInput}
                      onChange={(event) => {
                        setWhenInput(event.target.value);
                        setError("");
                      }}
                      className="h-11 w-full min-w-0 border border-line bg-ink px-3 text-sm tracking-normal text-ivory normal-case"
                    />
                  </label>
                  {error ? <p className="text-sm text-gold">{error}</p> : null}
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="solid-btn">
                      Keep this hour
                    </button>
                    <button type="button" className="ghost-btn" onClick={onSky}>
                      Use the sky
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-xs tracking-widest text-stone uppercase">
              Tropical season · 22 December – 19 January
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

function Unit({ label, value }: { label: string; value?: number }) {
  return (
    <li className="min-w-0 border border-line bg-ink/50 px-1 py-3 text-center sm:px-4 sm:py-5">
      <div className="font-light text-3xl leading-none text-ivory tabular-nums sm:text-6xl">
        {value === undefined ? <span className="text-stone">00</span> : <Digit value={value} />}
      </div>
      <p className="mt-3 text-xs tracking-widest text-stone uppercase">{label}</p>
    </li>
  );
}

function Digit({ value }: { value: number }) {
  return <span className="text-ivory tabular-nums">{String(value).padStart(2, "0")}</span>;
}

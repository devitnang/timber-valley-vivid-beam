import { motion, useReducedMotion } from "framer-motion";

const STARS: Array<[number, number]> = [
  [48, 98],
  [92, 68],
  [136, 90],
  [168, 132],
  [214, 102],
  [258, 64],
  [304, 46],
  [328, 86],
  [276, 124],
  [220, 158],
];

const LINES = [
  "M48 98 L92 68 L136 90 L168 132 L214 102 L258 64 L304 46",
  "M304 46 L328 86",
  "M258 64 L276 124 L220 158",
];

export default function Constellation() {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 360 190" className="h-auto w-full text-gold" fill="none" aria-hidden="true">
      {LINES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.75 }}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.08 * i }}
        />
      ))}
      {STARS.map(([cx, cy], i) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="6" fill="currentColor" opacity="0.14" />
          <motion.circle
            cx={cx}
            cy={cy}
            r="1.7"
            fill="currentColor"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12 + i * 0.04 }}
          />
        </g>
      ))}
    </svg>
  );
}

import { useEffect, useState } from "react";

const VIEW_W = 1000;
const VIEW_H = 700;

function hash(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Dot = { x: number; y: number; r: number; o: number; gold: boolean; delay: number };

function spiral(cx: number, cy: number, scale: number, turns: number, count: number, rot: number, seed: number): Dot[] {
  return Array.from({ length: count }, (_, i) => {
    const along = (i / count) * turns;
    const radius = (along / turns) * scale;
    const angle = along * 3.5 + (i % 2) * Math.PI + rot;
    const scatter = (hash(seed + i) - 0.5) * (6 + along * 4);
    const fade = Math.max(0, 1 - along / (turns + 0.15));
    return {
      x: cx + Math.cos(angle) * radius + scatter,
      y: cy + Math.sin(angle) * radius * 0.46 + scatter * 0.32,
      r: along < 0.45 ? 1.6 : 0.65,
      o: 0.08 + fade * (i % 6 === 0 ? 0.7 : 0.42),
      gold: i % 6 === 0,
      delay: 0,
    };
  });
}

const MAIN_GALAXY = spiral(790, 150, 250, 3.2, 640, 0.4, 20);
const FAR_GALAXY = spiral(150, 130, 110, 2.5, 180, 1.1, 90);

const STARS: Dot[] = Array.from({ length: 200 }, (_, i) => ({
  x: hash(i + 1) * VIEW_W,
  y: hash(i + 19) * VIEW_H,
  r: hash(i + 3) < 0.9 ? 0.5 + hash(i + 7) * 0.9 : 1.5 + hash(i + 11) * 0.8,
  o: 0.45 + hash(i + 13) * 0.55,
  gold: hash(i + 23) > 0.9,
  delay: hash(i + 29) * 6,
}));

const FLARES = STARS.filter((_, i) => hash(i + 41) > 0.97);

export default function StarryBackground() {
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wash-gold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(212, 180, 131)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(212, 180, 131)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wash-teal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(78, 118, 114)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(78, 118, 114)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wash-amber" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(168, 122, 74)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="rgb(168, 122, 74)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="core-main" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(244, 239, 230)" stopOpacity="0.85" />
          <stop offset="28%" stopColor="rgb(212, 180, 131)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(212, 180, 131)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="core-far" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(244, 239, 230)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(244, 239, 230)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="meteor-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(244, 239, 230)" stopOpacity="0" />
          <stop offset="100%" stopColor="rgb(244, 239, 230)" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width={VIEW_W} height={VIEW_H} fill="#07060b" />
      <ellipse cx="790" cy="140" rx="320" ry="180" fill="url(#wash-gold)" />
      <ellipse cx="230" cy="470" rx="380" ry="140" fill="url(#wash-teal)" />
      <ellipse cx="640" cy="610" rx="420" ry="110" fill="url(#wash-amber)" />

      {live ? (
        <>
          <g className="galaxy-spin">
            {MAIN_GALAXY.map((dot, i) => (
              <circle
                key={`g-${i}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill={dot.gold ? "rgb(212, 180, 131)" : "rgb(244, 239, 230)"}
                opacity={dot.o}
              />
            ))}
            <circle cx="790" cy="150" r="46" fill="url(#core-main)" />
          </g>

          <g className="galaxy-spin-slow">
            {FAR_GALAXY.map((dot, i) => (
              <circle
                key={`f-${i}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill="rgb(244, 239, 230)"
                opacity={dot.o * 0.7}
              />
            ))}
            <circle cx="150" cy="130" r="22" fill="url(#core-far)" />
          </g>

          {STARS.map((star, i) => (
            <circle
              key={`s-${i}`}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill={star.gold ? "rgb(212, 180, 131)" : "rgb(244, 239, 230)"}
              opacity={star.o}
              className="twinkle"
              style={{ animationDelay: `${star.delay.toFixed(2)}s` }}
            />
          ))}

          {FLARES.map((star, i) => (
            <g key={`fl-${i}`} className="twinkle" style={{ animationDelay: `${star.delay.toFixed(2)}s` }}>
              <line
                x1={star.x - 7}
                y1={star.y}
                x2={star.x + 7}
                y2={star.y}
                stroke="rgb(244, 239, 230)"
                strokeWidth="0.6"
                opacity="0.45"
              />
              <line
                x1={star.x}
                y1={star.y - 7}
                x2={star.x}
                y2={star.y + 7}
                stroke="rgb(244, 239, 230)"
                strokeWidth="0.6"
                opacity="0.45"
              />
            </g>
          ))}

          <g className="meteor meteor-a">
            <line x1="0" y1="0" x2="70" y2="0" stroke="url(#meteor-stroke)" strokeWidth="1.2" />
          </g>
          <g className="meteor meteor-b">
            <line x1="0" y1="0" x2="54" y2="0" stroke="url(#meteor-stroke)" strokeWidth="1" />
          </g>
        </>
      ) : null}
    </svg>
  );
}

import React from "react";
import { AbsoluteFill } from "remotion";

interface TopicTheme {
  gradient: string;
  accent: string;
  orb1: string;
  orb2: string;
  orb3: string;
  label: string;
}

const TOPIC_THEMES: Record<string, TopicTheme> = {
  ai_tips: {
    gradient: "linear-gradient(135deg, #09090f 0%, #14003d 45%, #0a1628 100%)",
    accent: "#818cf8",
    orb1: "rgba(99,102,241,0.55)",
    orb2: "rgba(167,139,250,0.35)",
    orb3: "rgba(59,130,246,0.22)",
    label: "AI Tips & Tricks",
  },
  claude_features: {
    gradient: "linear-gradient(135deg, #0f0800 0%, #3d1800 45%, #1a0a00 100%)",
    accent: "#fbbf24",
    orb1: "rgba(245,158,11,0.55)",
    orb2: "rgba(251,191,36,0.35)",
    orb3: "rgba(234,88,12,0.22)",
    label: "Claude Features",
  },
  copilot_tricks: {
    gradient: "linear-gradient(135deg, #000f08 0%, #002010 45%, #001a18 100%)",
    accent: "#34d399",
    orb1: "rgba(16,185,129,0.55)",
    orb2: "rgba(52,211,153,0.35)",
    orb3: "rgba(6,182,212,0.22)",
    label: "GitHub Copilot",
  },
  data_engineering_ai: {
    gradient: "linear-gradient(135deg, #000714 0%, #001540 45%, #000c28 100%)",
    accent: "#60a5fa",
    orb1: "rgba(59,130,246,0.55)",
    orb2: "rgba(96,165,250,0.35)",
    orb3: "rgba(14,165,233,0.22)",
    label: "Data Engineering + AI",
  },
  lessons_learned: {
    gradient: "linear-gradient(135deg, #0f0008 0%, #2d0018 45%, #1a000e 100%)",
    accent: "#f472b6",
    orb1: "rgba(236,72,153,0.55)",
    orb2: "rgba(244,114,182,0.35)",
    orb3: "rgba(168,85,247,0.22)",
    label: "Lessons Learned",
  },
};

export interface PostCardProps {
  headline: string;
  insight: string;
  topic: string;
  author?: string;
  handle?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  headline,
  insight,
  topic,
  author = "Dhamotharan",
  handle = "theknightcodes",
}) => {
  const theme: TopicTheme = TOPIC_THEMES[topic] ?? TOPIC_THEMES.ai_tips;
  const { gradient, accent, orb1, orb2, orb3, label } = theme;

  const fontSize =
    headline.length > 90 ? 44
    : headline.length > 70 ? 52
    : headline.length > 50 ? 60
    : 70;

  const initial = author.charAt(0).toUpperCase();

  return (
    <AbsoluteFill
      style={{
        background: gradient,
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Aurora orb 1 — top-right primary glow */}
      <div
        style={{
          position: "absolute",
          top: -140,
          right: -140,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb1} 0%, transparent 68%)`,
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* Aurora orb 2 — bottom-left secondary glow */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb2} 0%, transparent 70%)`,
          filter: "blur(36px)",
          pointerEvents: "none",
        }}
      />

      {/* Aurora orb 3 — center subtle depth */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "42%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb3} 0%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative concentric rings — top-right corner */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          border: `1.5px solid ${accent}20`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: `1px solid ${accent}12`,
          pointerEvents: "none",
        }}
      />

      {/* Dot-grid overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${accent}20 1px, transparent 0)`,
          backgroundSize: "38px 38px",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 80px 48px",
        }}
      >
        {/* TOP: Topic badge */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: `${accent}18`,
              border: `1.5px solid ${accent}50`,
              borderRadius: 40,
              padding: "10px 26px",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* Accent dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
            <span
              style={{
                color: accent,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          </div>
        </div>

        {/* MIDDLE: Headline + insight */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            flex: 1,
            justifyContent: "center",
            paddingTop: 32,
            paddingBottom: 24,
            maxWidth: "87%",
          }}
        >
          {/* Gradient accent bar */}
          <div
            style={{
              width: 72,
              height: 5,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${accent}, ${accent}55)`,
            }}
          />

          {/* Headline */}
          <div
            style={{
              color: "#ffffff",
              fontSize,
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: "-0.025em",
              textShadow: "0 4px 32px rgba(0,0,0,0.6)",
            }}
          >
            {headline}
          </div>

          {/* Insight */}
          {insight ? (
            <div
              style={{
                color: "rgba(255,255,255,0.68)",
                fontSize: 26,
                lineHeight: 1.6,
                maxWidth: "80%",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}
            >
              {insight}
            </div>
          ) : null}
        </div>

        {/* BOTTOM: Author + topic tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${accent}22`,
            paddingTop: 22,
          }}
        >
          {/* Author profile */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Avatar circle */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${accent}, ${accent}66)`,
                border: `2px solid ${accent}77`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>
                {initial}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{ color: "#ffffff", fontSize: 17, fontWeight: 700 }}
              >
                {author}
              </span>
              <span
                style={{
                  color: `${accent}cc`,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                @{handle}
              </span>
            </div>
          </div>

          {/* Topic tag */}
          <div
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}44`,
              borderRadius: 10,
              padding: "8px 20px",
            }}
          >
            <span
              style={{
                color: accent,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              #{label.replace(/\s+\+\s+|\s+/g, "")}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

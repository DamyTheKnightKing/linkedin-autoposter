import React from "react";
import { AbsoluteFill } from "remotion";

// ── Syntax token colours (GitHub Dark palette) ─────────────────────────────────
const C = {
  keyword: "#ff7b72",
  string:  "#a5d6ff",
  comment: "#8b949e",
  func:    "#d2a8ff",
  var:     "#e6edf3",
  num:     "#79c0ff",
  type:    "#ffa657",
  muted:   "#8b949e",
};

type Token    = { t: string; c: string };
type CodeLine = Token[];

interface TopicTheme {
  accent:  string;
  label:   string;
  file:    string;
  getCode: (headline: string, insight: string) => CodeLine[];
}

const TOPIC_THEMES: Record<string, TopicTheme> = {
  ai_tips: {
    accent: "#3fb950",
    label:  "AI Tips & Tricks",
    file:   "llm_tips.py",
    getCode: (headline, insight) => {
      const cmt = insight.length > 60 ? insight.slice(0, 57) + "…" : insight;
      return [
        [{ t: "def ", c: C.keyword }, { t: "reduce_hallucinations", c: C.func }, { t: "(", c: C.var }, { t: "llm", c: C.type }, { t: ":", c: C.var }, { t: " Model", c: C.type }, { t: ") -> ", c: C.var }, { t: "str", c: C.type }, { t: ":", c: C.var }],
        [{ t: `    # 💡 ${cmt}`, c: C.comment }],
        [{ t: "    llm", c: C.var }, { t: ".", c: C.muted }, { t: "add_instruction", c: C.func }, { t: "(", c: C.var }, { t: `"If unsure, say 'I don't know'"`, c: C.string }, { t: ")", c: C.var }],
        [{ t: "    ", c: C.var }, { t: "return", c: C.keyword }, { t: " llm", c: C.var }, { t: ".", c: C.muted }, { t: "query", c: C.func }, { t: "(", c: C.var }, { t: "grounded", c: C.type }, { t: "=", c: C.keyword }, { t: "True", c: C.num }, { t: ")", c: C.var }],
        [{ t: "", c: C.var }],
        [{ t: "# ✅ Result: 40% fewer hallucinations in production", c: C.comment }],
      ];
    },
  },

  claude_features: {
    accent: "#e3b341",
    label:  "Claude Features",
    file:   "claude_demo.py",
    getCode: (headline, insight) => {
      const cmt = insight.length > 55 ? insight.slice(0, 52) + "…" : insight;
      return [
        [{ t: "import", c: C.keyword }, { t: " anthropic", c: C.type }],
        [{ t: `# 💡 ${cmt}`, c: C.comment }],
        [{ t: "client", c: C.var }, { t: " = ", c: C.keyword }, { t: "anthropic", c: C.type }, { t: ".", c: C.muted }, { t: "Anthropic", c: C.func }, { t: "()", c: C.var }],
        [{ t: "response", c: C.var }, { t: " = ", c: C.keyword }, { t: "client", c: C.var }, { t: ".messages.", c: C.muted }, { t: "create", c: C.func }, { t: "(", c: C.var }],
        [{ t: "    model", c: C.var }, { t: "=", c: C.keyword }, { t: `"claude-opus-4-5"`, c: C.string }, { t: ",", c: C.var }],
        [{ t: "    thinking", c: C.var }, { t: "={", c: C.var }, { t: `"type"`, c: C.string }, { t: ": ", c: C.var }, { t: `"enabled"`, c: C.string }, { t: ", ", c: C.var }, { t: `"budget_tokens"`, c: C.string }, { t: ": ", c: C.var }, { t: "8000", c: C.num }, { t: "})", c: C.var }],
      ];
    },
  },

  copilot_tricks: {
    accent: "#58a6ff",
    label:  "GitHub Copilot",
    file:   "copilot_tricks.md",
    getCode: (headline, insight) => {
      const cmt = insight.length > 55 ? insight.slice(0, 52) + "…" : insight;
      return [
        [{ t: "# GitHub Copilot — Power Shortcuts", c: C.comment }],
        [{ t: `# 💡 ${cmt}`, c: C.comment }],
        [{ t: "", c: C.var }],
        [{ t: "Ctrl", c: C.keyword }, { t: "+", c: C.muted }, { t: "I", c: C.string }, { t: "          →  Inline edit / refactor", c: C.var }],
        [{ t: "Ctrl", c: C.keyword }, { t: "+", c: C.muted }, { t: "Shift", c: C.string }, { t: "+", c: C.muted }, { t: "I", c: C.string }, { t: "    →  Open Copilot Chat", c: C.var }],
        [{ t: "@workspace", c: C.func }, { t: "       →  Full codebase context", c: C.var }],
        [{ t: "@terminal", c: C.func }, { t: "        →  Explain last error", c: C.var }],
      ];
    },
  },

  data_engineering_ai: {
    accent: "#39d353",
    label:  "Data Engineering + AI",
    file:   "quality_check.sql",
    getCode: (headline, insight) => {
      const cmt = insight.length > 52 ? insight.slice(0, 49) + "…" : insight;
      return [
        [{ t: `-- 💡 ${cmt}`, c: C.comment }],
        [{ t: "SELECT", c: C.keyword }],
        [{ t: "  pipeline_run_id,", c: C.var }],
        [{ t: "  COUNT", c: C.func }, { t: "(*) ", c: C.var }, { t: "FILTER", c: C.keyword }, { t: " (", c: C.var }, { t: "WHERE", c: C.keyword }, { t: " quality_score ", c: C.var }, { t: "<", c: C.keyword }, { t: " 0.8", c: C.num }, { t: ")", c: C.var }, { t: " AS", c: C.keyword }, { t: " anomalies", c: C.var }],
        [{ t: "FROM", c: C.keyword }, { t: " ai_quality_checks", c: C.type }],
        [{ t: "GROUP BY", c: C.keyword }, { t: " 1", c: C.num }, { t: ";", c: C.var }],
      ];
    },
  },

  lessons_learned: {
    accent: "#d2a8ff",
    label:  "Lessons Learned",
    file:   "git.log",
    getCode: (headline, insight) => {
      const cmt = insight.length > 52 ? insight.slice(0, 49) + "…" : insight;
      return [
        [{ t: "$ git log --oneline --graph", c: C.func }],
        [{ t: "* ", c: C.num }, { t: "a3f92b1 ", c: C.type }, { t: "fix: never deploy on a Friday again", c: C.var }],
        [{ t: "* ", c: C.num }, { t: "8c21d04 ", c: C.type }, { t: "refactor: skip staging = 3hr incident", c: C.var }],
        [{ t: "* ", c: C.num }, { t: "4e10ab2 ", c: C.type }, { t: `docs: ${cmt}`, c: C.var }],
        [{ t: "", c: C.var }],
        [{ t: "# 💀 Incident duration: 3 hrs   ✅ Resolution: rollback", c: C.comment }],
      ];
    },
  },
};

export interface PostCardProps {
  headline: string;
  insight:  string;
  topic:    string;
  author?:  string;
  handle?:  string;
}

// Renders a single line of syntax-highlighted tokens
const CodeRow: React.FC<{ line: CodeLine; fontSize: number }> = ({ line, fontSize }) => (
  <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.7, fontSize }}>
    {line.map((tok, i) => (
      <span key={i} style={{ color: tok.c, whiteSpace: "pre" }}>{tok.t}</span>
    ))}
  </div>
);

export const PostCard: React.FC<PostCardProps> = ({
  headline,
  insight,
  topic,
  author = "Dhamotharan",
  handle = "theknightcodes",
}) => {
  const theme: TopicTheme = TOPIC_THEMES[topic] ?? TOPIC_THEMES.ai_tips;
  const { accent, label, file, getCode } = theme;

  const codeFontSize = 17;
  const headlineFontSize =
    headline.length > 80 ? 38
    : headline.length > 60 ? 44
    : headline.length > 40 ? 50
    : 56;

  const codeLines = getCode(headline, insight);
  const initial   = author.charAt(0).toUpperCase();

  // Scanline stripe colour
  const scanline = `rgba(${accent === "#3fb950" ? "63,185,80" : accent === "#e3b341" ? "227,179,65" : accent === "#58a6ff" ? "88,166,255" : accent === "#39d353" ? "57,211,83" : "210,168,255"},0.03)`;

  return (
    <AbsoluteFill
      style={{
        background: "#0d1117",
        fontFamily: "'Cascadia Code','Fira Code','Consolas','Menlo',monospace",
        overflow: "hidden",
      }}
    >
      {/* Scanlines */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 27px,${scanline} 27px,${scanline} 28px)`,
          pointerEvents: "none",
        }}
      />

      {/* Ambient glow — top-right */}
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle,${accent}22 0%,transparent 68%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {/* Ambient glow — bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle,${accent}14 0%,transparent 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main layout ────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "36px 52px 32px",
          gap: 20,
        }}
      >
        {/* ── Terminal window ─────────────────────────────────────── */}
        <div
          style={{
            background: "#161b22",
            border: `1px solid #30363d`,
            borderRadius: 10,
            overflow: "hidden",
            flex: "0 0 auto",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: "#1c2128",
              borderBottom: "1px solid #30363d",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 7 }}>
              {["#ff5f57","#ffbd2e","#28c840"].map((col, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: col }} />
              ))}
            </div>
            <span style={{ color: "#8b949e", fontSize: 14, marginLeft: 8 }}>
              {file}
            </span>
          </div>

          {/* Code body */}
          <div style={{ padding: "16px 24px 14px", display: "flex", flexDirection: "column" }}>
            {codeLines.map((line, i) => (
              <CodeRow key={i} line={line} fontSize={codeFontSize} />
            ))}
          </div>
        </div>

        {/* ── Headline section ────────────────────────────────────── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          {/* Comment-style topic label */}
          <div style={{ color: C.comment, fontSize: 18, letterSpacing: "0.02em" }}>
            <span style={{ color: accent }}>// </span>{label}
          </div>

          {/* Accent bar */}
          <div style={{ width: 56, height: 4, borderRadius: 2, background: `linear-gradient(90deg,${accent},${accent}44)` }} />

          {/* Headline */}
          <div
            style={{
              color: "#e6edf3",
              fontSize: headlineFontSize,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
            }}
          >
            {headline}
          </div>
        </div>

        {/* ── Bottom author strip ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid #21262d`,
            paddingTop: 18,
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: `linear-gradient(135deg,${accent},${accent}55)`,
                border: `2px solid ${accent}66`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                fontWeight: 800,
                color: "#fff",
                fontFamily: "'Inter',system-ui,sans-serif",
                flexShrink: 0,
              }}
            >
              {initial}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: "#e6edf3", fontSize: 16, fontWeight: 700, fontFamily: "'Inter',system-ui,sans-serif" }}>
                {author}
              </span>
              <span style={{ color: `${accent}cc`, fontSize: 13, fontFamily: "inherit" }}>
                @{handle}
              </span>
            </div>
          </div>

          {/* Prompt indicator + topic tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: accent, fontSize: 15, opacity: 0.7 }}>▶</span>
            <div
              style={{
                background: `${accent}15`,
                border: `1px solid ${accent}40`,
                borderRadius: 8,
                padding: "7px 18px",
                color: accent,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              #{label.replace(/\s+\+\s+|\s+/g, "")}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

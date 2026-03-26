"use client";

import { useMemo } from "react";
import { glossary } from "@/components/glossary/GlossaryTooltip";

export default function FormattedContent({ text }: { text: string }) {
  const elements = useMemo(() => {
    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((para, pIdx) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      const lines = trimmed.split("\n");
      const listItems = lines.filter((l) => /^\s*-\s/.test(l));
      const isAllList = listItems.length === lines.length;

      if (isAllList) {
        return (
          <ul key={pIdx} className="space-y-2 my-3">
            {listItems.map((item, i) => (
              <li key={i} className="flex gap-2 text-[15px] text-zinc-300 leading-relaxed">
                <span className="text-indigo-400 mt-0.5 shrink-0">&#8226;</span>
                <span>{formatInline(item.replace(/^\s*-\s*/, ""))}</span>
              </li>
            ))}
          </ul>
        );
      }

      const hasCodePattern = lines.some(
        (l) => /^\s{2,}\[/.test(l) || /^\s{2,}→/.test(l) || /^\s{2,}GET\s/.test(l),
      );
      if (hasCodePattern) {
        const normalLines: string[] = [];
        const codeLines: string[] = [];
        let inCode = false;
        for (const line of lines) {
          const isCode = /^\s{2,}/.test(line) && (/\[/.test(line) || /→/.test(line) || /GET\s/.test(line) || /^\s{2,}-\s/.test(line));
          if (isCode) {
            inCode = true;
            codeLines.push(line);
          } else if (inCode && line.trim() === "") {
            codeLines.push("");
          } else {
            inCode = false;
            normalLines.push(line);
          }
        }
        return (
          <div key={pIdx} className="my-3">
            {normalLines.length > 0 && (
              <p className="text-[15px] text-zinc-300 leading-relaxed mb-2">
                {formatInline(normalLines.join("\n"))}
              </p>
            )}
            {codeLines.length > 0 && (
              <pre className="text-[13px] text-indigo-300 bg-zinc-800/60 rounded-lg px-4 py-3 font-mono border border-zinc-700/50 overflow-x-auto">
                {codeLines.join("\n")}
              </pre>
            )}
          </div>
        );
      }

      const mixedListIdx = lines.findIndex((l) => /^\s*-\s/.test(l));
      if (mixedListIdx > 0) {
        const before = lines.slice(0, mixedListIdx);
        const items = lines.slice(mixedListIdx);
        return (
          <div key={pIdx} className="my-3">
            <p className="text-[15px] text-zinc-300 leading-relaxed mb-2">
              {formatInline(before.join(" "))}
            </p>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex gap-2 text-[15px] text-zinc-300 leading-relaxed">
                  <span className="text-indigo-400 mt-0.5 shrink-0">&#8226;</span>
                  <span>{formatInline(item.replace(/^\s*-\s*/, ""))}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      return (
        <p key={pIdx} className="text-[15px] text-zinc-300 leading-relaxed my-3">
          {formatInline(trimmed.replace(/\n/g, " "))}
        </p>
      );
    });
  }, [text]);

  return <div>{elements}</div>;
}

const glossaryTerms = Object.keys(glossary).sort((a, b) => b.length - a.length);
const glossaryPattern = new RegExp(
  `\\b(${glossaryTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi",
);

function wrapGlossaryTerms(text: string, keyPrefix: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  const seen = new Set<string>();

  for (const match of text.matchAll(glossaryPattern)) {
    const term = match[0];
    const lower = term.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);

    const idx = match.index!;
    if (idx > lastIndex) {
      result.push(text.slice(lastIndex, idx));
    }
    result.push(
      <span
        key={`${keyPrefix}-g-${idx}`}
        data-glossary={lower}
        className="underline decoration-dotted decoration-zinc-600 underline-offset-2 cursor-help"
      >
        {term}
      </span>,
    );
    lastIndex = idx + term.length;
  }
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  return result.length > 0 ? result : [text];
}

function formatInline(text: string, keyPrefix = "0"): React.ReactNode[] {
  const parts = text.split(/("([^"]+)")/g);
  const result: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i % 3 === 2) {
      result.push(
        <code key={i} className="text-[13px] text-amber-300/90 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono">
          {part}
        </code>,
      );
    } else if (i % 3 === 0 && part) {
      result.push(...wrapGlossaryTerms(part, `${keyPrefix}-${i}`));
    }
  }

  return result;
}

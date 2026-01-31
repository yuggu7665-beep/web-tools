"use client";

import { useState, useMemo } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;
    // Basic reading time calculation (avg 200 wpm)
    const readingTime = Math.ceil(words / 200);

    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  const handleClear = () => setText("");
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  return (
    <ToolPageLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in real-time."
      category="Text Tools"
      howToUse={
        <ul className="list-disc pl-5 space-y-2">
          <li>Type or paste your text into the large text area.</li>
          <li>The statistics above the text area will update automatically as you type.</li>
          <li>You can see the count/number of words, characters (with and without spaces), sentences, and paragraphs.</li>
          <li>Use the "Copy Text" button to copy the content to your clipboard.</li>
          <li>Use the "Clear" button to start over.</li>
        </ul>
      }
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatBox label="Words" value={stats.words} />
          <StatBox label="Characters" value={stats.chars} />
          <StatBox label="Chars (no space)" value={stats.charsNoSpace} />
          <StatBox label="Sentences" value={stats.sentences} />
          <StatBox label="Paragraphs" value={stats.paragraphs} />
          <StatBox label="Reading Time" value={`~${stats.readingTime} min`} />
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm sm:text-base transition-shadow"
          />
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClear} disabled={!text}>
              Clear
            </Button>
            <Button onClick={handleCopy} disabled={!text}>
              Copy Text
            </Button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
        {value}
      </div>
      <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

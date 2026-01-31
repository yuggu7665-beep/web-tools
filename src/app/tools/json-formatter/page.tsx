"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const format = (spaces: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const minify = () => format(0);
  const prettify = () => format(2);

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, prettify, and validate your JSON data."
      category="Developer Tools"
      howToUse={
         <ul className="list-disc pl-5 space-y-2">
          <li>Paste your JSON code into the editor.</li>
          <li>Click "Prettify" to format it with indentation (human readable).</li>
          <li>Click "Minify" to remove all whitespace (machine readable).</li>
          <li>If the JSON is invalid, an error message will appear explaining why.</li>
        </ul>
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <div className="space-x-2">
                <Button onClick={prettify}>Prettify</Button>
                <Button variant="outline" onClick={minify}>Minify</Button>
            </div>
            <div className="space-x-2">
                <Button variant="secondary" onClick={() => setInput("")}>Clear</Button>
                <Button variant="secondary" onClick={() => navigator.clipboard.writeText(input)}>Copy</Button>
            </div>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-mono">
                Error: {error}
            </div>
        )}

        <textarea
          value={input}
          onChange={(e) => {
              setInput(e.target.value);
              setError(null);
          }}
          placeholder='{"key": "value"}'
          className={`w-full h-[500px] p-4 rounded-lg border font-mono text-sm leading-relaxed resize-y focus:ring-2 focus:ring-blue-500 outline-none
            ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          spellCheck={false}
        />
      </div>
    </ToolPageLayout>
  );
}

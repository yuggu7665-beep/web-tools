"use client";

import { useState, useMemo } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";

export default function RegexTesterPage() {
  const [regexStr, setRegexStr] = useState("");
  const [flags, setFlags] = useState("gm");
  const [testString, setTestString] = useState("");

  const result = useMemo(() => {
    if (!regexStr) return null;
    try {
      const regex = new RegExp(regexStr, flags);
      const matches = Array.from(testString.matchAll(regex));
      return { 
          valid: true, 
          matches: matches.map(m => ({
              match: m[0],
              index: m.index,
              groups: m.groups
          })),
          count: matches.length
      };
    } catch (e) {
      return { valid: false, error: (e as Error).message };
    }
  }, [regexStr, flags, testString]);

  // Simple highlighting logic (very basic)
  const highlightedText = useMemo(() => {
      if (!result?.valid || !regexStr || result.count === 0) return testString;
      
      let lastIndex = 0;
      const parts = [];
      
      // Re-run match to be safe and simple 
      // (matchAll iterator is consumed, need fresh one)
      try {
        const regex = new RegExp(regexStr, flags);
        const matches = Array.from(testString.matchAll(regex));

        matches.forEach((m, i) => {
            if (m.index !== undefined) {
                // Text before match
                if (m.index > lastIndex) {
                    parts.push(testString.slice(lastIndex, m.index));
                }
                // Match itself
                parts.push(
                    <span key={i} className="bg-yellow-200 text-black font-semibold rounded-sm">
                        {m[0]}
                    </span>
                );
                lastIndex = m.index + m[0].length;
            }
        });
        // Remaining text
        if (lastIndex < testString.length) {
            parts.push(testString.slice(lastIndex));
        }
        return parts;
      } catch {
          return testString;
      }

  }, [testString, regexStr, flags, result]);

  return (
    <ToolPageLayout
      title="Regex Tester"
      description="Test your regular expressions in real-time."
      category="Developer Tools"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
                 <Input 
                    label="Regular Expression"
                    value={regexStr}
                    onChange={(e) => setRegexStr(e.target.value)}
                    placeholder="e.g. [a-z]+"
                    error={result?.valid === false ? result.error : undefined}
                 />
            </div>
            <div>
                 <Input 
                    label="Flags"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    placeholder="gim"
                 />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Test String</label>
                <textarea
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    className="w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Enter text to match against..."
                />
            </div>

            <div className="space-y-4">
                 <div>
                    <label className="text-sm font-medium text-gray-700 flex justify-between">
                        <span>Match Preview</span>
                        {result?.valid && (
                            <span className="text-blue-600">{result.count} matches found</span>
                        )}
                    </label>
                    <div className="w-full h-64 p-4 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm overflow-auto whitespace-pre-wrap break-all text-gray-500">
                        {highlightedText || "No matches"}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";

export default function CodeFormatterPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("html");

  const format = () => {
    // Very basic basic indentation logic for MVP without heavy prettier dependency file
    // Real-world would use Prettier Standalone, but keeping it bundle-light here.
    let formatted = "";
    let indentLevel = 0;
    const indentString = "  "; // 2 spaces

    if (language === "json") {
        try {
            formatted = JSON.stringify(JSON.parse(code), null, 2);
        } catch {
            alert("Invalid JSON code");
            formatted = code; // Fallback
        }
    } else {
        // Naive formatting for HTML/XML/CSS-like structures
        const lines = code
            .replace(/>\s*</g, ">\n<") // Split HTML tags
            .replace(/;\s*/g, ";\n")   // Split CSS props
            .replace(/{\s*/g, "{\n")   // Split CSS blocks
            .replace(/}\s*/g, "\n}")   // Split CSS blocks
            .split("\n");

        formatted = lines.map(line => {
            line = line.trim();
            if (!line) return "";
            
            // Decrease indent for closing tags/braces
            if (line.match(/^<\//) || line.match(/^}/) || line.match(/^-->/)) {
                indentLevel = Math.max(0, indentLevel - 1);
            }

            const currentIndent = indentString.repeat(indentLevel);
            
            // Increase indent for opening tags/braces
            // Exceptions: <br>, <hr>, <input>, <img>, <!DOCTYPE>
            if (
                (line.match(/^<[^/]/) && !line.match(/\/>$/) && !line.match(/^<(br|hr|img|input|meta|link|!)/)) ||
                line.match(/{$/)
            ) {
                const ret = currentIndent + line;
                indentLevel++;
                return ret;
            }
            
            return currentIndent + line;
        }).join("\n");
    }

    setCode(formatted);
  };

  return (
    <ToolPageLayout
      title="Code Formatter"
      description="Format HTML, CSS, JSON, and XML with correct indentation."
      category="Developer Tools"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
             <div className="flex gap-2">
                 <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                 >
                     <option value="html">HTML / XML</option>
                     <option value="css">CSS</option>
                     <option value="json">JSON</option>
                 </select>
                 <Button onClick={format}>Format Code</Button>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCode("")}>Clear</Button>
                <Button onClick={() => navigator.clipboard.writeText(code)}>Copy</Button>
             </div>
        </div>

        <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`<!-- Paste your ${language.toUpperCase()} code here -->`}
            className="w-full min-h-[400px] p-4 rounded-lg border border-gray-300 font-mono text-sm leading-relaxed resize-y focus:ring-2 focus:ring-blue-500 outline-none"
            spellCheck={false}
        />
      </div>
    </ToolPageLayout>
  );
}

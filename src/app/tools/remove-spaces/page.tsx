"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";

export default function RemoveSpacesPage() {
  const [text, setText] = useState("");

  const processText = (action: "trim" | "remove-all" | "remove-extra" | "remove-lines") => {
    let result = text;
    switch (action) {
      case "trim":
        result = text.split("\n").map(line => line.trim()).join("\n").trim();
        break;
      case "remove-all":
        result = text.replace(/\s/g, "");
        break;
      case "remove-extra":
        // Replaces multiple whitespace with single space, preserves newlines slightly better usually, but "remove extra spaces" usually means reduce multiple spaces to one.
        result = text.replace(/[ \t]+/g, " ").trim();
        break;
      case "remove-lines":
        result = text.replace(/[\r\n]+/g, " ");
        break;
    }
    setText(result);
  };

  return (
    <ToolPageLayout
      title="Remove Spaces"
      description="Clean up your text by removing unnecessary spaces, tabs, and line breaks."
      category="Text Tools"
      howToUse={
        <ul className="list-disc pl-5 space-y-2">
          <li>Paste your messy text into the box.</li>
          <li><strong>Trim Only:</strong> Removes spaces from the start and end of each line description.</li>
          <li><strong>Remove Extra Spaces:</strong> Turns "Hello   World" into "Hello World".</li>
          <li><strong>Remove All Spaces:</strong> Turns "Hello World" into "HelloWorld".</li>
          <li><strong>Remove Line Breaks:</strong> Joins all lines into a single long string.</li>
        </ul>
      }
    >
      <div className="space-y-6">
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here..."
            className="w-full h-48 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm sm:text-base"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="secondary" onClick={() => processText("trim")}>Trim Ends</Button>
          <Button variant="secondary" onClick={() => processText("remove-extra")}>Remove Extra Spaces</Button>
          <Button variant="secondary" onClick={() => processText("remove-lines")}>Remove Line Breaks</Button>
          <Button variant="secondary" onClick={() => processText("remove-all")}>Remove All Spaces</Button>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
             <Button variant="outline" onClick={() => setText("")}>Clear</Button>
             <Button onClick={() => navigator.clipboard.writeText(text)}>Copy Result</Button>
        </div>
      </div>
    </ToolPageLayout>
  );
}

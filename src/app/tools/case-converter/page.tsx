"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab" | "alternating";

export default function CaseConverterPage() {
  const [text, setText] = useState("");

  const convert = (type: CaseType) => {
    let result = text;
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case "camel":
         result = text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, "");
        break;
      case "pascal":
         result = text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/\s+/g, "");
        break;
      case "snake":
        result = text
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('_') || text;
        break;
      case "kebab":
        result = text
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('-') || text;
        break;
      case "alternating":
        result = text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
        break;
    }
    setText(result);
  };

  const handleCopy = () => navigator.clipboard.writeText(text);

  return (
    <ToolPageLayout
      title="Case Converter"
      description="Convert your text to any case format: Uppercase, Lowercase, Title Case, and more."
      category="Text Tools"
      howToUse={
        <ul className="list-disc pl-5 space-y-2">
          <li>Enter your text in the text area below.</li>
          <li>Click any of the buttons to instantly convert the text to that format.</li>
          <li>Use "Sentence Case" for standard writing capitalization.</li>
          <li>Use "Title Case" for headlines.</li>
          <li>Developer formats like Camel, Snake, and Kebab case are also available.</li>
        </ul>
      }
    >
      <div className="space-y-6">
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text to convert..."
            className="w-full h-48 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm sm:text-base"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="secondary" onClick={() => convert("upper")}>UPPERCASE</Button>
          <Button variant="secondary" onClick={() => convert("lower")}>lowercase</Button>
          <Button variant="secondary" onClick={() => convert("title")}>Title Case</Button>
          <Button variant="secondary" onClick={() => convert("sentence")}>Sentence case</Button>
          <Button variant="secondary" onClick={() => convert("camel")}>camelCase</Button>
          <Button variant="secondary" onClick={() => convert("pascal")}>PascalCase</Button>
          <Button variant="secondary" onClick={() => convert("snake")}>snake_case</Button>
          <Button variant="secondary" onClick={() => convert("kebab")}>kebab-case</Button>
          <Button variant="secondary" onClick={() => convert("alternating")}>aLtErNaTiNg</Button>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
             <Button variant="outline" onClick={() => setText("")}>Clear</Button>
             <Button onClick={handleCopy}>Copy Result</Button>
        </div>
      </div>
    </ToolPageLayout>
  );
}

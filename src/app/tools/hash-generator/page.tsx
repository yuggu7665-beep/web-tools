"use client";

  import { useState, useMemo } from "react";
  import { ToolPageLayout } from "@/components/ToolPageLayout";
  // Note: We use require here to avoid some strict ESM/TS issues in client components if standard import fails, 
  // but let's try standard import first. Actually, crypto-js types need to be installed or require used. 
  // Just using dynamic import or simple require style for ease.
  import CryptoJS from "crypto-js"; 

  export default function HashGeneratorPage() {
    const [input, setInput] = useState("");
    
    const hashes = useMemo(() => {
        if (!input) {
            return { md5: "", sha1: "", sha256: "", sha512: "" };
        }
        return {
            md5: CryptoJS.MD5(input).toString(),
            sha1: CryptoJS.SHA1(input).toString(),
            sha256: CryptoJS.SHA256(input).toString(),
            sha512: CryptoJS.SHA512(input).toString(),
        };
    }, [input]);

  return (
    <ToolPageLayout
      title="Hash Generator"
      description="Generate cryptographic hashes (MD5, SHA-1, SHA-256) for your text string."
      category="Security"
    >
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text to hash..."
                    className="w-full h-24 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 block"
                />
            </div>

            <div className="space-y-4">
                <HashResult label="MD5" value={hashes.md5} />
                <HashResult label="SHA-1" value={hashes.sha1} />
                <HashResult label="SHA-256" value={hashes.sha256} />
                <HashResult label="SHA-512" value={hashes.sha512} />
            </div>
        </div>
    </ToolPageLayout>
  );
}

function HashResult({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-gray-700 uppercase">{label}</span>
                <button 
                    onClick={() => navigator.clipboard.writeText(value)}
                    className="text-xs text-blue-600 font-medium hover:underline disabled:opacity-50"
                    disabled={!value}
                >
                    Copy
                </button>
            </div>
            <div className="font-mono text-sm break-all text-gray-600 min-h-[1.25rem]">
                {value || "Waiting for input..."}
            </div>
        </div>
    );
}

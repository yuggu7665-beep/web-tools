"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generate = useCallback(() => {
    const chars = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let charset = "";
    if (options.uppercase) charset += chars.uppercase;
    if (options.lowercase) charset += chars.lowercase;
    if (options.numbers) charset += chars.numbers;
    if (options.symbols) charset += chars.symbols;

    if (charset === "") return setPassword("");

    let newPassword = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        newPassword += charset[array[i] % charset.length];
    }
    setPassword(newPassword);
  }, [length, options]);

  // Generate on mount
  useEffect(() => {
      generate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const strength = password.length > 12 && options.symbols && options.numbers && options.uppercase ? "Strong" : "Moderate";

  return (
    <ToolPageLayout
      title="Password Generator"
      description="Create strong, secure passwords instantly."
      category="Security"
    >
      <div className="space-y-8">
        {/* Display Area */}
        <div className="relative">
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 text-center break-all font-mono text-3xl text-gray-800 tracking-wider min-h-[5rem] flex items-center justify-center">
                {password}
            </div>
             <div className={`absolute top-2 right-2 px-2 py-0.5 mt-1 mr-1 text-xs font-bold rounded uppercase ${strength === "Strong" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {strength}
            </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                        <label>Password Length</label>
                        <span>{length}</span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Character Types</label>
                    <Checkbox label="Uppercase (A-Z)" checked={options.uppercase} onChange={(c) => setOptions({...options, uppercase: c})} />
                    <Checkbox label="Lowercase (a-z)" checked={options.lowercase} onChange={(c) => setOptions({...options, lowercase: c})} />
                    <Checkbox label="Numbers (0-9)" checked={options.numbers} onChange={(c) => setOptions({...options, numbers: c})} />
                    <Checkbox label="Symbols (!@#$)" checked={options.symbols} onChange={(c) => setOptions({...options, symbols: c})} />
                </div>
            </div>

             <div className="flex flex-col justify-center gap-4">
                <Button size="lg" onClick={generate}>Generate New Password</Button>
                <Button variant="outline" size="lg" onClick={() => navigator.clipboard.writeText(password)}>
                    Copy to Clipboard
                </Button>
            </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
    return (
        <label className="flex items-center space-x-3 cursor-pointer">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={(e) => onChange(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{label}</span>
        </label>
    );
}

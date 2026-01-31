"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function FileSizeConverterPage() {
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState<"B" | "KB" | "MB" | "GB" | "TB">("MB");

  const amount = parseFloat(size) || 0;

  // Convert to bytes first
  const toBytes = {
    B: amount,
    KB: amount * 1024,
    MB: amount * 1024 * 1024,
    GB: amount * 1024 * 1024 * 1024,
    TB: amount * 1024 * 1024 * 1024 * 1024,
  };

  const bytes = toBytes[unit];

  const conversions = {
    B: bytes,
    KB: bytes / 1024,
    MB: bytes / (1024 * 1024),
    GB: bytes / (1024 * 1024 * 1024),
    TB: bytes / (1024 * 1024 * 1024 * 1024),
  };

  const copyResult = (value: number, unit: string) => {
    navigator.clipboard.writeText(`${value.toFixed(2)} ${unit}`);
    alert(`Copied: ${value.toFixed(2)} ${unit}`);
  };

  return (
    <ToolPageLayout
      title="File Size Converter"
      description="Convert between Bytes, KB, MB, GB, and TB instantly."
      category="Calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
            <select 
              value={unit} 
              onChange={(e) => setUnit(e.target.value as any)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="B">Bytes (B)</option>
              <option value="KB">Kilobytes (KB)</option>
              <option value="MB">Megabytes (MB)</option>
              <option value="GB">Gigabytes (GB)</option>
              <option value="TB">Terabytes (TB)</option>
            </select>
          </div>

          <Input
            label="File Size"
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="1024"
          />
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversions</h3>
          
          <div className="space-y-2">
            {Object.entries(conversions).map(([u, val]) => (
              <div key={u} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{u}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{val.toFixed(2)}</div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => copyResult(val, u)}
                  className="text-xs"
                >
                  Copy
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

type ConversionType = "weight" | "length" | "volume";

export default function UnitConverterPage() {
  const [value, setValue] = useState("");
  const [type, setType] = useState<ConversionType>("weight");
  const [fromUnit, setFromUnit] = useState("kg");
  const [toUnit, setToUnit] = useState("lbs");

  const amount = parseFloat(value) || 0;

  const conversions = {
    weight: {
      kg: { kg: 1, lbs: 2.20462, oz: 35.274 },
      lbs: { kg: 0.453592, lbs: 1, oz: 16 },
      oz: { kg: 0.0283495, lbs: 0.0625, oz: 1 },
    },
    length: {
      cm: { cm: 1, m: 0.01, ft: 0.0328084, inch: 0.393701 },
      m: { cm: 100, m: 1, ft: 3.28084, inch: 39.3701 },
      ft: { cm: 30.48, m: 0.3048, ft: 1, inch: 12 },
      inch: { cm: 2.54, m: 0.0254, ft: 0.0833333, inch: 1 },
    },
    volume: {
      liters: { liters: 1, gallons: 0.264172, ml: 1000 },
      gallons: { liters: 3.78541, gallons: 1, ml: 3785.41 },
      ml: { liters: 0.001, gallons: 0.000264172, ml: 1 },
    },
  };

  const units = {
    weight: ["kg", "lbs", "oz"],
    length: ["cm", "m", "ft", "inch"],
    volume: ["liters", "gallons", "ml"],
  };

  const getConversion = () => {
    const typeConversions = conversions[type];
    const fromConversions = typeConversions[fromUnit as keyof typeof typeConversions];
    if (!fromConversions) return 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rate = (fromConversions as any)[toUnit];
    return rate ? rate * amount : 0;
  };

  const result = getConversion();

  const copyResult = () => {
    navigator.clipboard.writeText(`${result.toFixed(4)} ${toUnit}`);
    alert(`Copied: ${result.toFixed(4)} ${toUnit}`);
  };

  return (
    <ToolPageLayout
      title="Unit Converter"
      description="Convert weight, length, and volume units with ease."
      category="Calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select 
              value={type} 
              onChange={(e) => {
                const newType = e.target.value as ConversionType;
                setType(newType);
                setFromUnit(units[newType][0]);
                setToUnit(units[newType][1]);
              }}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="weight">Weight</option>
              <option value="length">Length</option>
              <option value="volume">Volume</option>
            </select>
          </div>

          <Input
            label="Value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="100"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
              <select 
                value={fromUnit} 
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {units[type].map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
              <select 
                value={toUnit} 
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {units[type].map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-cyan-200 dark:border-cyan-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Result</h3>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg text-center">
            <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
              {result.toFixed(4)}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">{toUnit}</div>
            <Button onClick={copyResult} className="w-full">
              📋 Copy Result
            </Button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

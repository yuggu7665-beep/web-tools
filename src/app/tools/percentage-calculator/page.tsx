"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function PercentageCalculatorPage() {
  // Simple Percentage: What is X% of Y?
  const [val1A, setVal1A] = useState("");
  const [val1B, setVal1B] = useState("");
  const [res1, setRes1] = useState<number | null>(null);

  const calc1 = () => {
    const a = parseFloat(val1A);
    const b = parseFloat(val1B);
    if (!isNaN(a) && !isNaN(b)) setRes1((a / 100) * b);
  };

  // Percentage Change: Increase/Decrease from X to Y
  const [val2A, setVal2A] = useState("");
  const [val2B, setVal2B] = useState("");
  const [res2, setRes2] = useState<number | null>(null);

  const calc2 = () => {
    const a = parseFloat(val2A);
    const b = parseFloat(val2B);
    if (!isNaN(a) && !isNaN(b) && a !== 0) {
      setRes2(((b - a) / a) * 100);
    }
  };

  // What Percentage: X is what percent of Y?
  const [val3A, setVal3A] = useState("");
  const [val3B, setVal3B] = useState("");
  const [res3, setRes3] = useState<number | null>(null);

  const calc3 = () => {
    const a = parseFloat(val3A);
    const b = parseFloat(val3B);
    if (!isNaN(a) && !isNaN(b) && b !== 0) {
      setRes3((a / b) * 100);
    }
  };

  return (
    <ToolPageLayout
      title="Percentage Calculator"
      description="Calculate percentages, percentage increase/decrease, and find what percent a number is of another."
      category="Calculators"
    >
      <div className="space-y-12">
        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">What is P% of X?</h3>
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex items-center gap-2 flex-grow">
              <span className="font-medium">What is</span>
              <Input
                type="number"
                value={val1A}
                onChange={(e) => setVal1A(e.target.value)}
                placeholder="%"
                className="w-24"
              />
              <span className="font-medium">% of</span>
              <Input
                type="number"
                value={val1B}
                onChange={(e) => setVal1B(e.target.value)}
                placeholder="Value"
              />
            </div>
            <Button onClick={calc1}>Calculate</Button>
          </div>
          {res1 !== null && (
            <div className="p-4 bg-blue-50 rounded-lg text-blue-800 font-medium">
              Result: {val1A}% of {val1B} is <span className="text-xl font-bold">{res1.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Percentage Change (X to Y)</h3>
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex items-center gap-2 flex-grow">
              <span className="font-medium">From</span>
              <Input
                type="number"
                value={val2A}
                onChange={(e) => setVal2A(e.target.value)}
                placeholder="Old"
              />
              <span className="font-medium">to</span>
              <Input
                type="number"
                value={val2B}
                onChange={(e) => setVal2B(e.target.value)}
                placeholder="New"
              />
            </div>
            <Button onClick={calc2}>Calculate</Button>
          </div>
          {res2 !== null && (
            <div className={`p-4 rounded-lg font-medium ${res2 >= 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              Result: {res2 >= 0 ? "Increase" : "Decrease"} of <span className="text-xl font-bold">{Math.abs(res2).toFixed(2)}%</span>
            </div>
          )}
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">What % is X of Y?</h3>
          <div className="flex flex-col sm:flex-row items-end gap-4">
             <div className="flex items-center gap-2 flex-grow">
              <Input
                type="number"
                value={val3A}
                onChange={(e) => setVal3A(e.target.value)}
                placeholder="Part"
              />
              <span className="font-medium">is what % of</span>
              <Input
                type="number"
                value={val3B}
                onChange={(e) => setVal3B(e.target.value)}
                placeholder="Total"
              />
            </div>
             <Button onClick={calc3}>Calculate</Button>
          </div>
           {res3 !== null && (
            <div className="p-4 bg-purple-50 rounded-lg text-purple-800 font-medium">
              Result: {val3A} is <span className="text-xl font-bold">{res3.toFixed(2)}%</span> of {val3B}
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

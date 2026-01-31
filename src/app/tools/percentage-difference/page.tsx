"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function PercentageDifferencePage() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const v1 = parseFloat(value1) || 0;
  const v2 = parseFloat(value2) || 0;

  const difference = v2 - v1;
  const percentChange = v1 !== 0 ? ((difference / v1) * 100) : 0;
  const isIncrease = difference > 0;
  const isDecrease = difference < 0;

  return (
    <ToolPageLayout
      title="Percentage Difference Calculator"
      description="Calculate percentage increase or decrease between two values."
      category="Calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input
            label="Original Value"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="100"
          />
          <Input
            label="New Value"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="150"
          />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Results</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Difference:</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {difference.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Percentage Change:</span>
              <span className={`text-2xl font-bold ${isIncrease ? 'text-green-600 dark:text-green-400' : isDecrease ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                {isIncrease && '+'}{percentChange.toFixed(2)}%
              </span>
            </div>

            {isIncrease && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  📈 <strong>Increase</strong> of {Math.abs(percentChange).toFixed(2)}%
                </p>
              </div>
            )}

            {isDecrease && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  📉 <strong>Decrease</strong> of {Math.abs(percentChange).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

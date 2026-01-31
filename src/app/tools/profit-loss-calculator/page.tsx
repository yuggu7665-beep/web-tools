"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";

export default function ProfitLossCalculatorPage() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("1");

  const cp = parseFloat(cost) || 0;
  const sp = parseFloat(price) || 0;
  const q = parseFloat(units) || 1;

  const totalCost = cp * q;
  const totalRev = sp * q;
  const profit = totalRev - totalCost;
  const margin = totalRev !== 0 ? (profit / totalRev) * 100 : 0;
  const breakEven = cp; // Break-even is when selling price equals cost price

  return (
    <ToolPageLayout
      title="Profit & Loss Calculator"
      description="Calculate profit, loss, margin %, and break-even price for your business."
      category="Calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input
            label="Cost Price (per unit)"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="100.00"
          />
          <Input
            label="Selling Price (per unit)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="150.00"
          />
           <Input
            label="Quantity"
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="1"
          />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Results</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {profit < 0 ? "Total Loss" : "Total Profit"}
              </dt>
              <dd className={`text-3xl font-extrabold ${profit < 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                ${Math.abs(profit).toFixed(2)}
              </dd>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Margin %</dt>
                <dd className={`text-xl font-bold ${profit < 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                  {margin.toFixed(2)}%
                </dd>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Break-Even</dt>
                <dd className="text-xl font-bold text-gray-900 dark:text-white">
                  ${breakEven.toFixed(2)}
                </dd>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total Cost</dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">${totalCost.toFixed(2)}</dd>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total Revenue</dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">${totalRev.toFixed(2)}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

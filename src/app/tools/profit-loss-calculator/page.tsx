"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ProfitLossCalculatorPage() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("1");
  const [result, setResult] = useState<{
    profit: string;
    profitMargin: string;
    totalCost: string;
    totalRevenue: string;
    isLoss: boolean;
  } | null>(null);

  const calculate = () => {
    const cp = parseFloat(cost);
    const sp = parseFloat(price);
    const q = parseFloat(units) || 1;

    if (isNaN(cp) || isNaN(sp)) return;

    const totalCost = cp * q;
    const totalRev = sp * q;
    const profit = totalRev - totalCost;
    const margin = (profit / totalRev) * 100;

    setResult({
      profit: Math.abs(profit).toFixed(2),
      profitMargin: margin.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalRevenue: totalRev.toFixed(2),
      isLoss: profit < 0,
    });
  };

  return (
    <ToolPageLayout
      title="Profit & Loss Calculator"
      description="Calculate total profit/loss and margin percentages."
      category="Calculators"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input
            label="Cost Price (per unit)"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0.00"
          />
          <Input
            label="Selling Price (per unit)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
           <Input
            label="Quantity (optional)"
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="1"
          />
          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
        </div>

         <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center space-y-6">
          {!result ? (
            <div className="text-center text-gray-500">
              Enter Cost and Selling price
            </div>
          ) : (
            <>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  {result.isLoss ? "Total Loss" : "Total Profit"}
                </dt>
                <dd className={`text-4xl font-extrabold ${result.isLoss ? "text-red-600" : "text-green-600"}`}>
                  ${result.profit}
                </dd>
              </div>
              
               <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                   <dt className="text-xs font-medium text-gray-500 uppercase">Profit Margin</dt>
                   <dd className={`text-lg font-bold ${result.isLoss ? "text-red-600" : "text-green-600"}`}>
                     {result.profitMargin}%
                   </dd>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase">Total Cost</dt>
                  <dd className="text-lg font-bold text-gray-900">${result.totalCost}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase">Total Revenue</dt>
                  <dd className="text-lg font-bold text-gray-900">${result.totalRevenue}</dd>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

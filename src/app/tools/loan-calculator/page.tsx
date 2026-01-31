"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState(""); // Years
  const [result, setResult] = useState<{ monthly: string; total: string; interest: string } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12; // Monthly rate
    const n = parseFloat(term) * 12; // Total months

    if (isNaN(p) || isNaN(r) || isNaN(n) || n <= 0) return;

    // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthly: monthlyPayment.toFixed(2),
      total: totalPayment.toFixed(2),
      interest: totalInterest.toFixed(2),
    });
  };

  return (
    <ToolPageLayout
      title="Loan Calculator"
      description="Estimate your monthly loan payments, total interest, and amortization."
      category="Calculators"
      howToUse={
        <ul className="list-disc pl-5 space-y-2">
          <li>Enter the total loan amount.</li>
          <li>Enter the annual interest rate (e.g., 5.5 for 5.5%).</li>
          <li>Enter the loan term in years (e.g., 30 for a standard mortgage).</li>
          <li>Click Calculate to see your estimated monthly payment.</li>
        </ul>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input
            label="Loan Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 250000"
          />
          <Input
            label="Annual Interest Rate (%)"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g. 6.5"
            step="0.01"
          />
          <Input
            label="Loan Term (Years)"
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. 30"
          />
          <Button onClick={calculateLoan} className="w-full">
            Calculate Payment
          </Button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center space-y-6">
          {!result ? (
            <div className="text-center text-gray-500">
              Enter details to see calculation
            </div>
          ) : (
            <>
              <div>
                <dt className="text-sm font-medium text-gray-500">Monthly Payment</dt>
                <dd className="text-4xl font-extrabold text-blue-600">${result.monthly}</dd>
              </div>
              <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase">Total Interest</dt>
                  <dd className="text-lg font-bold text-gray-900">${result.interest}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase">Total Repayment</dt>
                  <dd className="text-lg font-bold text-gray-900">${result.total}</dd>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

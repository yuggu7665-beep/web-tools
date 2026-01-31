"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function SalaryConverterPage() {
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState<"hourly" | "daily" | "monthly" | "yearly">("yearly");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerWeek, setDaysPerWeek] = useState("5");

  const amount = parseFloat(salary) || 0;
  const hpd = parseFloat(hoursPerDay) || 8;
  const dpw = parseFloat(daysPerWeek) || 5;

  const weeksPerYear = 52;
  const monthsPerYear = 12;

  const conversions = {
    hourly: amount,
    daily: amount * hpd,
    weekly: amount * hpd * dpw,
    monthly: (amount * hpd * dpw * weeksPerYear) / monthsPerYear,
    yearly: amount * hpd * dpw * weeksPerYear,
  };

  // Convert based on selected period
  let hourly, daily, monthly, yearly;
  
  switch(period) {
    case "hourly":
      hourly = amount;
      daily = conversions.daily;
      monthly = conversions.monthly;
      yearly = conversions.yearly;
      break;
    case "daily":
      hourly = amount / hpd;
      daily = amount;
      monthly = (amount * dpw * weeksPerYear) / monthsPerYear;
      yearly = amount * dpw * weeksPerYear;
      break;
    case "monthly":
      hourly = (amount * monthsPerYear) / (hpd * dpw * weeksPerYear);
      daily = (amount * monthsPerYear) / (dpw * weeksPerYear);
      monthly = amount;
      yearly = amount * monthsPerYear;
      break;
    case "yearly":
      hourly = amount / (hpd * dpw * weeksPerYear);
      daily = amount / (dpw * weeksPerYear);
      monthly = amount / monthsPerYear;
      yearly = amount;
      break;
  }

  return (
    <ToolPageLayout
      title="Salary Converter"
      description="Convert between hourly, daily, monthly, and yearly salary rates."
      category="Calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
            <select 
              value={period} 
              onChange={(e) => setPeriod(e.target.value as any)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <Input
            label={`Salary (${period})`}
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="50000"
          />

          <Input
            label="Hours per Day"
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            placeholder="8"
          />

          <Input
            label="Days per Week"
            type="number"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(e.target.value)}
            placeholder="5"
          />
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversions</h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Hourly</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${hourly?.toFixed(2)}</div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Daily</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${daily?.toFixed(2)}</div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Monthly</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${monthly?.toFixed(2)}</div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Yearly</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">${yearly?.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

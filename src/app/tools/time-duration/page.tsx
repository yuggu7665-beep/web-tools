"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function TimeDurationPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const calculateDuration = () => {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
    
    return { years, months, days: remainingDays, totalDays: days, hours, minutes };
  };

  const duration = calculateDuration();

  return (
    <ToolPageLayout
      title="Time Duration Calculator"
      description="Calculate the exact duration between two dates and times."
      category="Calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input
            label="Start Date & Time"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date & Time"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Duration</h3>
          
          {duration ? (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{duration.years}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Years</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{duration.months}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Months</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{duration.days}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{duration.totalDays}</strong> total days
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{duration.hours}</strong> hours, <strong className="text-gray-900 dark:text-white">{duration.minutes}</strong> minutes
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Select start and end dates
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

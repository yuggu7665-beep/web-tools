"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");

  const calculateAge = () => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Total days lived
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    
    return { years, months, days, daysUntilBirthday, totalDays };
  };

  const age = calculateAge();

  return (
    <ToolPageLayout
      title="Age Calculator"
      description="Calculate your exact age and countdown to your next birthday."
      category="Calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input
            label="Date of Birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-xl border border-pink-200 dark:border-pink-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Age</h3>
          
          {age ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{age.years}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Years</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{age.months}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Months</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{age.days}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Days Lived</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{age.totalDays.toLocaleString()}</div>
              </div>

              <div className="p-4 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 rounded-lg">
                <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">🎂 Next Birthday In</div>
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{age.daysUntilBirthday} days</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Enter your date of birth
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";

export function TypewriterSearch({ placeholderPrefix = "Try searching for " }: { placeholderPrefix?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Suggested tools for typewriter effect
  const examples = useRef(["Code Formatter...", "Loan Calculator...", "Magic Eraser...", "Password Generator..."]);
  
  // Typewriter logic
  useEffect(() => {
    let currentExampleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentExample = examples.current[currentExampleIdx];
      
      if (isDeleting) {
        setPlaceholder(prev => prev.substring(0, prev.length - 1));
        currentCharIdx--;
      } else {
        setPlaceholder(currentExample.substring(0, currentCharIdx + 1));
        currentCharIdx++;
      }

      let speed = 100;

      if (!isDeleting && currentCharIdx === currentExample.length) {
        // Finished typing
        speed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentCharIdx === 0) {
        // Finished deleting
        isDeleting = false;
        currentExampleIdx = (currentExampleIdx + 1) % examples.current.length;
        speed = 500;
      } else if (isDeleting) {
        speed = 50;
      }

      timeout = setTimeout(type, speed);
    };

    timeout = setTimeout(type, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Filter suggestions
  const suggestions = searchTerm.length > 0 
    ? tools.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : [];

  const handleSelect = (href: string) => {
    router.push(href);
  };

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto z-50">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="block w-full pl-10 pr-3 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl leading-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
          placeholder={`${placeholderPrefix}${placeholder}`}
        />
        {/* Right side styling or clear button could go here */}
      </div>

      {/* Auto-suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul>
            {suggestions.map((tool) => (
              <li key={tool.id}>
                <button
                  onClick={() => handleSelect(tool.href)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 group"
                >
                   <span className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                     {/* Generic Icon based on category? simplified. */}
                     <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                     </svg>
                   </span>
                   <div>
                       <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{tool.title}</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{tool.description}</p>
                   </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

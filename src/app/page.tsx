"use client";

import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // Simple intersection observer logic for scroll reveal
  const [visibleTools, setVisibleTools] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
                setVisibleTools((prev) => new Set(prev).add(id));
            }
        }
      });
    }, { threshold: 0.1, rootMargin: "50px" });

    const elements = document.querySelectorAll(".tool-card-animate");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="space-y-16">
      <section className="text-center space-y-6 py-20 min-h-[60vh] flex flex-col justify-center items-center relative overflow-hidden">
         {/* Background decoration */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
         
        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight animate-fade-in-up">
          Yuggu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tools</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 animate-fade-in-up delay-100">
          Supercharge your workflow with our organized collection of <span className="font-semibold text-gray-900">fast</span>, <span className="font-semibold text-gray-900">private</span>, and <span className="font-semibold text-gray-900">free</span> web tools.
        </p>
        <div className="pt-4  animate-fade-in-up delay-200">
           <a href="#tools-grid" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-transform hover:scale-105 shadow-lg shadow-blue-500/30">
             Explore Tools
           </a>
        </div>
      </section>

      <section id="tools-grid" className="scroll-mt-20 space-y-16">
        {["Text", "Calculator", "Developer", "Security", "Image"].map((category) => {
            const categoryTools = tools.filter(t => t.category === category);
            if (categoryTools.length === 0) return null;

            return (
                <div key={category} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">{category} Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryTools.map((tool, index) => (
                        <div 
                            key={tool.id} 
                            data-id={tool.id}
                            className={`tool-card-animate transition-all duration-700 transform ${visibleTools.has(tool.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <ToolCard
                              title={tool.title}
                              description={tool.description}
                              href={tool.href}
                              category={tool.category}
                            />
                        </div>
                      ))}
                    </div>
                </div>
            );
        })}
      </section>
    </div>
  );
}

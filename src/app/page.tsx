"use client";

import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { useEffect, useRef, useState } from "react";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { TypewriterSearch } from "@/components/TypewriterSearch";


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
      <ParticlesBackground />
      <section className="text-center space-y-6 py-20 min-h-[60vh] flex flex-col justify-center items-center relative overflow-hidden z-10">
         {/* Background decoration - subtle glow behind text for readability */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/30 rounded-full blur-3xl -z-10 pointer-events-none" />
         
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight animate-fade-in-up drop-shadow-2xl">
          Yuggu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Tools</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-200 animate-fade-in-up delay-100 drop-shadow-md pb-8">
          Supercharge your workflow with our organized collection of <span className="font-bold text-white">fast</span>, <span className="font-bold text-white">private</span>, and <span className="font-bold text-white">free</span> web tools.
        </p>

        <div className="w-full px-4 animate-fade-in-up delay-150 mb-8">
             <TypewriterSearch />
        </div>

        <div className="pt-2 animate-fade-in-up delay-200">
           <a href="#tools-grid" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-transform hover:scale-105 shadow-xl shadow-blue-500/20 backdrop-blur-sm">
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

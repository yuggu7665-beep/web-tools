import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Specific Tools for <span className="text-blue-600">Specific Needs</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          A collection of free, privacy-focused online tools that run entirely in your browser. No server-side processing.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              category={tool.category}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

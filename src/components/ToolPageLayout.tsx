import Link from "next/link";
import { ReactNode } from "react";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  category: string;
  children: ReactNode;
  howToUse?: ReactNode;
  metadata?: ReactNode;
}

export function ToolPageLayout({
  title,
  description,
  category,
  children,
  howToUse,
}: ToolPageLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Breadcrumb - Basic implementation */}
      <nav className="flex text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools" className="hover:text-blue-600">Tools</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{title}</span>
      </nav>

      <div className="space-y-2">
        <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
          {category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {description}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        {children}
      </div>

      {howToUse && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">How to use this tool</h2>
          <div className="prose prose-blue max-w-none text-gray-600">
            {howToUse}
          </div>
        </div>
      )}
    </div>
  );
}

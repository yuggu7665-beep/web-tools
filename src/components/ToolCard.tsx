import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
}

export function ToolCard({ title, description, href, category }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
    >
      <div className="flex flex-col h-full">
        {category && (
          <span className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-2">
            {category}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm flex-grow">
          {description}
        </p>
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
          Use Tool
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yuggu Tools - Free Developer & Utility Tools",
  description: "A collection of free, fast, and privacy-focused online tools for developers and everyone. No server-side processing.",
  verification: {
    google: "google-site-verification=YOUR_VERIFICATION_CODE", // User to replace this
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

// ... metadata ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
            <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-extrabold text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Yuggu Tools
                    </Link>
                </div>
                <nav className="flex items-center space-x-4">
                    <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                    Home
                    </Link>
                    <Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                    Tools
                    </Link>
                    <ThemeToggle />
                </nav>
                </div>
            </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
            </main>

            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Yuggu Tools. All rights reserved.
                </p>
            </div>
            </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

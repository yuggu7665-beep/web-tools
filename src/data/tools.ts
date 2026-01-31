export interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "Text" | "Calculator" | "Developer" | "Security" | "Other";
}

export const tools: Tool[] = [
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, and sentences in your text.",
    href: "/tools/word-counter",
    category: "Text",
  },
  {
    id: "case-converter",
    title: "Case Converter",
    description: "Convert text between Uppercase, Lowercase, Title Case, and more.",
    href: "/tools/case-converter",
    category: "Text",
  },
  {
    id: "remove-spaces",
    title: "Remove Spaces",
    description: "Remove extra spaces, leading/trailing whitespace, or all spaces.",
    href: "/tools/remove-spaces",
    category: "Text",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages, percentage increase/decrease, and more.",
    href: "/tools/percentage-calculator",
    category: "Calculator",
  },
  {
    id: "loan-calculator",
    title: "Loan Calculator",
    description: "Estimate monthly payments for loans and mortgages.",
    href: "/tools/loan-calculator",
    category: "Calculator",
  },
  {
    id: "profit-loss-calculator",
    title: "Profit/Loss Calculator",
    description: "Calculate profit margins and loss percentages.",
    href: "/tools/profit-loss-calculator",
    category: "Calculator",
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data.",
    href: "/tools/json-formatter",
    category: "Developer",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate strong, secure passwords with custom settings.",
    href: "/tools/password-generator",
    category: "Security",
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-256, and other hashes from text.",
    href: "/tools/hash-generator",
    category: "Security",
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions against text patterns.",
    href: "/tools/regex-tester",
    category: "Developer",
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens (client-side).",
    href: "/tools/jwt-decoder",
    category: "Developer",
  },
  {
    id: "api-tester",
    title: "API Tester",
    description: "Send HTTP requests to test REST APIs.",
    href: "/tools/api-tester",
    category: "Developer",
  },
  {
    id: "code-formatter",
    title: "Code Formatter",
    description: "Format HTML, CSS, and JSON code.",
    href: "/tools/code-formatter",
    category: "Developer",
  },
];

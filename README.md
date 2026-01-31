# Web Tools Platform

A premium, client-side-first web tools platform consisting of multiple utility tools (calculators, text tools, developer tools, etc.) hosted on Vercel, with GitHub as the single source of truth.

## Features

- **Text Tools**: Word Counter, Case Converter, Remove Spaces
- **Calculators**: Percentage, Loan, Profit/Loss
- **Developer Tools**: JSON Formatter
- **Security**: Password Generator, Hash Generator (SHA-256, MD5)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Local Development

1.  **Clone the repository** (if not already local):

    ```bash
    git clone <your-repo-url>
    cd web-tools
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is designed to be deployed on Vercel.

1.  Push your code to a GitHub repository.
2.  Import the project in Vercel.
3.  Vercel will detect the Next.js framework and configure the build settings automatically.
4.  Deploy!

Any changes pushed to the `main` branch will automatically trigger a redeployment.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/data`: Static data (e.g., list of tools).
- `src/lib`: Utility functions.

## Adding a New Tool

1.  Create a new folder in `src/app/tools/[tool-name]`.
2.  Create a `page.tsx` file in that folder.
3.  Use the `<ToolPageLayout>` component to wrap your tool content.
4.  Add the tool metadata to `src/data/tools.ts` to make it appear on the landing page.

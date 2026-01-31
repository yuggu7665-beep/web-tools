"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";

const PYTHON_SCRIPT = `
"""
Advanced Background Remover
Powered by rembg (U^2-Net)

Installation:
pip install rembg pillow click watchdog

Usage:
python background_remover.py input.jpg output.png
"""

import sys
import os
from rembg import remove
from PIL import Image

def remove_background(input_path, output_path):
    print(f"Processing: {input_path}...")
    try:
        with open(input_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                opt = remove(i.read())
                o.write(opt)
        print(f"Success! Saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python background_remover.py <input> <output>")
    else:
        remove_background(sys.argv[1], sys.argv[2])
`;

export default function BackgroundRemoverPage() {
  const copyCode = () => {
    navigator.clipboard.writeText(PYTHON_SCRIPT);
    alert("Code copied to clipboard!");
  };

  const downloadScript = () => {
    const element = document.createElement("a");
    const file = new Blob([PYTHON_SCRIPT], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "background_remover.py";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <ToolPageLayout
      title="AI Background Remover (Python)"
      description="An advanced python utility to automatically remove image backgrounds using AI."
      category="Image"
    >
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">🚀 How to run this tool</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Install Python (3.8 or higher)</li>
                <li>Install dependencies: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">pip install rembg pillow</code></li>
                <li>Run the script: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">python background_remover.py input.jpg output.png</code></li>
            </ol>
        </div>

        <div className="flex gap-4">
             <Button onClick={downloadScript}>Download Script (.py)</Button>
             <Button variant="outline" onClick={copyCode}>Copy Code</Button>
        </div>

        <div className="relative">
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl overflow-x-auto text-sm font-mono border border-gray-800">
                <code>{PYTHON_SCRIPT}</code>
            </pre>
        </div>
      </div>
    </ToolPageLayout>
  );
}

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
  const downloadGUI = () => {
    const element = document.createElement("a");
    element.href = "/python-tools/background_remover_gui.py";
    element.download = "background_remover_gui.py";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ToolPageLayout
      title="AI Background Remover (Python)"
      description="Download a working Python GUI program to remove image backgrounds using AI."
      category="Image"
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">🚀 Working GUI Program</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This is a complete, working Python application with a graphical interface. Just download and run!
            </p>
            <Button onClick={downloadGUI} className="w-full sm:w-auto">
              📥 Download GUI Program (.py)
            </Button>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">📋 Installation Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Install Python (3.8 or higher) from <a href="https://python.org" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">python.org</a></li>
                <li>Install dependencies: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">pip install rembg pillow</code></li>
                <li>Download the GUI program above</li>
                <li>Run: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">python background_remover_gui.py</code></li>
            </ol>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">✨ Features</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Beautiful dark-themed GUI interface</li>
                <li>Select any image (PNG, JPG, WEBP)</li>
                <li>AI-powered background removal using U^2-Net</li>
                <li>Preview results before saving</li>
                <li>Save with transparent background (PNG)</li>
                <li>100% offline - no internet required after installation</li>
            </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

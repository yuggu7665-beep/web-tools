
"""
Advanced Background Remover
Powered by rembg (U^2-Net)

Installation:
pip install rembg pillow click watchdog

Usage:
python background_remover.py input.jpg output.png
OR
python background_remover.py input_folder/ output_folder/

GUI Mode coming soon!
"""

import sys
import os
from rembg import remove
from PIL import Image
import platform

def remove_background(input_path, output_path):
    print(f"Processing: {input_path}...")
    try:
        if not os.path.exists(input_path):
            print(f"Error: Input file {input_path} not found.")
            return

        with open(input_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                input_data = i.read()
                output_data = remove(input_data)
                o.write(output_data)
        
        print(f"Success! Saved to {output_path}")

    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def main():
    print("=== Advanced Background Remover ===")
    
    if len(sys.argv) < 3:
        print("Usage: python background_remover.py <input_file_or_dir> <output_file_or_dir>")
        print("\nInteractive Mode:")
        inp = input("Enter input image path: ").strip().strip('"')
        out = input("Enter output image path (e.g. out.png): ").strip().strip('"')
        
        if inp and out:
            remove_background(inp, out)
        return

    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    if os.path.isdir(input_path):
        if not os.path.exists(output_path):
            os.makedirs(output_path)
            
        for filename in os.listdir(input_path):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                inp = os.path.join(input_path, filename)
                out = os.path.join(output_path, os.path.splitext(filename)[0] + ".png")
                remove_background(inp, out)
    else:
        remove_background(input_path, output_path)

if __name__ == "__main__":
    main()

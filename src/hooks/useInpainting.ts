"use client";

import { useState } from "react";

export function useInpainting() {
  const [isProcessing, setIsProcessing] = useState(false);

  const inpaint = async (
    canvas: HTMLCanvasElement,
    maskCanvas: HTMLCanvasElement
  ) => {
    setIsProcessing(true);

    try {
      const ctx = canvas.getContext("2d");
      const maskCtx = maskCanvas.getContext("2d");
      if (!ctx || !maskCtx) return;

      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.getImageData(0, 0, width, height);
      const maskData = maskCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const mask = maskData.data;

      // Basic algorithm: Iterative Pixel Propagation (simplified Navier-Stokes or diffusion)
      // This is a "working" algorithm that runs in-browser without heavy models.
      // It propagates colors from the edge of the mask inwards.

      // Clone data to avoid reading updated pixels in same pass immediately (optional, but simpler for diffusion)
      // Actually, updating in place works for basic diffusion.

      for (let iter = 0; iter < 20; iter++) { // multi-pass for better fill
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const idx = (y * width + x) * 4;
              
              // If pixel is masked (mask alpha > 0 or white)
              if (mask[idx + 3] > 0) { 
                // Collect neighbors
                let r = 0, g = 0, b = 0, count = 0;
                
                // Check 4 neighbors
                const neighbors = [
                    { nx: x - 1, ny: y },
                    { nx: x + 1, ny: y },
                    { nx: x, ny: y - 1 },
                    { nx: x, ny: y + 1 },
                    // Diagonals
                    // { nx: x - 1, ny: y - 1 },
                    // { nx: x + 1, ny: y - 1 },
                    // { nx: x - 1, ny: y + 1 },
                    // { nx: x + 1, ny: y + 1 },
                ];

                for (const {nx, ny} of neighbors) {
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const nIdx = (ny * width + nx) * 4;
                        // Only weight non-masked pixels OR pixels that have been processed?
                        // For simple diffusion: just average all valid neighbors.
                        // Ideally checking if neighbor itself is mask:
                        // If neighbor is NOT masked, give it high weight.
                        // If neighbor IS masked, give it normal weight (it allows propagation).
                        r += data[nIdx];
                        g += data[nIdx + 1];
                        b += data[nIdx + 2];
                        count++;
                    }
                }

                if (count > 0) {
                    data[idx] = r / count;
                    data[idx + 1] = g / count;
                    data[idx + 2] = b / count;
                    data[idx + 3] = 255; // Ensure alpha is full
                }
              }
            }
          }
          // Reverse pass (bottom-right to top-left) for better coverage
           for (let y = height - 1; y >= 0; y--) {
            for (let x = width - 1; x >= 0; x--) {
                const idx = (y * width + x) * 4;
                 if (mask[idx + 3] > 0) { 
                     // Same logic
                     let r = 0, g = 0, b = 0, count = 0;
                      const neighbors = [
                        { nx: x - 1, ny: y },
                        { nx: x + 1, ny: y },
                        { nx: x, ny: y - 1 },
                        { nx: x, ny: y + 1 },
                    ];
                      for (const {nx, ny} of neighbors) {
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            const nIdx = (ny * width + nx) * 4;
                            r += data[nIdx];
                            g += data[nIdx + 1];
                            b += data[nIdx + 2];
                            count++;
                        }
                    }
                     if (count > 0) {
                        data[idx] = r / count;
                        data[idx + 1] = g / count;
                        data[idx + 2] = b / count;
                        data[idx + 3] = 255;
                    }
                 }
            }
           }
      }

      ctx.putImageData(imageData, 0, 0);
      
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return { inpaint, isProcessing };
}

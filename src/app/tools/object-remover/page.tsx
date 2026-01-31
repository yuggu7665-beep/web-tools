"use client";

import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/Button";
import { useInpainting } from "@/hooks/useInpainting";
import { useRef, useState, useEffect } from "react";

export default function ObjectRemoverPage() {
  const [image, setImage] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null); // Hidden canvas for mask
  const [isDrawing, setIsDrawing] = useState(false);
  const { inpaint, isProcessing } = useInpainting();
  
  // Initialize canvas when image loads
  useEffect(() => {
    if (image && canvasRef.current && maskCanvasRef.current) {
      const canvas = canvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const maskCtx = maskCanvas.getContext("2d");
      
      const img = new Image();
      img.src = image;
      img.onload = () => {
        // limit max size to fit screen but keep aspect
        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);
        
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Clear mask
        maskCtx?.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
      };
    }
  }, [image]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    // Reset path
    const ctx = maskCanvasRef.current?.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");

    if (ctx && maskCtx) {
      // Visual feedback (red overlay)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();

      // Mask logic (white on transparent)
      maskCtx.fillStyle = "white";
      maskCtx.beginPath();
      maskCtx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      maskCtx.fill();
    }
  };

  const handleRemove = async () => {
    if (canvasRef.current && maskCanvasRef.current) {
        await inpaint(canvasRef.current, maskCanvasRef.current);
    }
  };
  
  const handleReset = () => {
      // Reload image
      if (image) {
          // Trigger useEffect logic again simplified
           const canvas = canvasRef.current;
           const maskCanvas = maskCanvasRef.current;
           const ctx = canvas?.getContext("2d");
           const maskCtx = maskCanvas?.getContext("2d");
           
           const img = new Image();
           img.src = image;
           img.onload = () => {
             if (canvas && maskCanvas && ctx && maskCtx) {
                 ctx.globalCompositeOperation = "source-over"; // Reset composite
                 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                 maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
             }
           }
      }
  }

  return (
    <ToolPageLayout
      title="Unwanted Object Remover (Magic Eraser)"
      description="Refine your images by painting over unwanted objects."
      category="Image"
    >
      <div className="space-y-6">
        {!image ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <span className="text-4xl mb-4">🖼️</span>
              <span className="text-lg font-medium text-gray-700">Click to Upload Image</span>
              <span className="text-sm text-gray-500 mt-2">Supports JPG, PNG</span>
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
             <div className="relative border shadow-lg rounded overflow-hidden cursor-crosshair">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="max-w-full"
                />
             </div>
             {/* Hidden Mask Canvas */}
             <canvas ref={maskCanvasRef} className="hidden" />

             <div className="flex flex-wrap gap-4 items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Brush Size:</span>
                    <input 
                        type="range" 
                        min="5" 
                        max="50" 
                        value={brushSize} 
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-32"
                    />
                </div>
                <Button onClick={handleRemove} disabled={isProcessing}>
                    {isProcessing ? "Removing..." : "Remove Object 🪄"}
                </Button>
                 <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                    Reset
                </Button>
                <Button variant="outline" onClick={() => setImage(null)}>
                    New Image
                </Button>
                <Button variant="secondary" onClick={() => {
                     const link = document.createElement('a');
                     link.download = 'edited-image.png';
                     link.href = canvasRef.current?.toDataURL() || '';
                     link.click();
                }}>
                    Download
                </Button>
             </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}

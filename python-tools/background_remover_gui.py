"""
Advanced Background Remover - GUI Version
Powered by rembg (U^2-Net)

Installation:
pip install rembg pillow

Usage:
python background_remover_gui.py
"""

import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from PIL import Image, ImageTk
import os
from rembg import remove
import threading

class BackgroundRemoverApp:
    def __init__(self, root):
        self.root = root
        self.root.title("AI Background Remover")
        self.root.geometry("800x600")
        self.root.configure(bg="#1a1a2e")
        
        self.input_path = None
        self.output_path = None
        
        # Title
        title = tk.Label(
            root, 
            text="🎨 AI Background Remover", 
            font=("Arial", 24, "bold"),
            bg="#1a1a2e",
            fg="#ffffff"
        )
        title.pack(pady=20)
        
        # Buttons Frame
        btn_frame = tk.Frame(root, bg="#1a1a2e")
        btn_frame.pack(pady=10)
        
        # Select Image Button
        self.select_btn = tk.Button(
            btn_frame,
            text="📁 Select Image",
            command=self.select_image,
            font=("Arial", 12),
            bg="#0f3460",
            fg="white",
            padx=20,
            pady=10,
            relief=tk.FLAT,
            cursor="hand2"
        )
        self.select_btn.pack(side=tk.LEFT, padx=10)
        
        # Remove Background Button
        self.remove_btn = tk.Button(
            btn_frame,
            text="✨ Remove Background",
            command=self.remove_background,
            font=("Arial", 12),
            bg="#16213e",
            fg="white",
            padx=20,
            pady=10,
            relief=tk.FLAT,
            cursor="hand2",
            state=tk.DISABLED
        )
        self.remove_btn.pack(side=tk.LEFT, padx=10)
        
        # Save Button
        self.save_btn = tk.Button(
            btn_frame,
            text="💾 Save Result",
            command=self.save_image,
            font=("Arial", 12),
            bg="#16213e",
            fg="white",
            padx=20,
            pady=10,
            relief=tk.FLAT,
            cursor="hand2",
            state=tk.DISABLED
        )
        self.save_btn.pack(side=tk.LEFT, padx=10)
        
        # Status Label
        self.status_label = tk.Label(
            root,
            text="Select an image to get started",
            font=("Arial", 10),
            bg="#1a1a2e",
            fg="#a0a0a0"
        )
        self.status_label.pack(pady=10)
        
        # Progress Bar
        self.progress = ttk.Progressbar(
            root,
            mode='indeterminate',
            length=400
        )
        
        # Image Display Frame
        self.image_frame = tk.Frame(root, bg="#1a1a2e")
        self.image_frame.pack(pady=20, fill=tk.BOTH, expand=True)
        
        self.result_image = None
        
    def select_image(self):
        file_path = filedialog.askopenfilename(
            title="Select Image",
            filetypes=[
                ("Image files", "*.png *.jpg *.jpeg *.webp *.bmp"),
                ("All files", "*.*")
            ]
        )
        
        if file_path:
            self.input_path = file_path
            self.status_label.config(text=f"Selected: {os.path.basename(file_path)}")
            self.remove_btn.config(state=tk.NORMAL)
            
    def remove_background(self):
        if not self.input_path:
            messagebox.showerror("Error", "Please select an image first!")
            return
            
        self.status_label.config(text="Processing... Please wait")
        self.progress.pack(pady=10)
        self.progress.start()
        self.remove_btn.config(state=tk.DISABLED)
        
        # Run in separate thread to avoid freezing UI
        thread = threading.Thread(target=self._process_image)
        thread.start()
        
    def _process_image(self):
        try:
            with open(self.input_path, 'rb') as i:
                input_data = i.read()
                output_data = remove(input_data)
                
            # Save to temp location
            self.output_path = self.input_path.rsplit('.', 1)[0] + '_no_bg.png'
            with open(self.output_path, 'wb') as o:
                o.write(output_data)
            
            # Load and display result
            self.result_image = Image.open(self.output_path)
            self.root.after(0, self._display_result)
            
        except Exception as e:
            self.root.after(0, lambda: messagebox.showerror("Error", f"Processing failed: {str(e)}"))
            self.root.after(0, self._reset_ui)
            
    def _display_result(self):
        self.progress.stop()
        self.progress.pack_forget()
        
        # Clear previous images
        for widget in self.image_frame.winfo_children():
            widget.destroy()
        
        # Resize image for display
        display_img = self.result_image.copy()
        display_img.thumbnail((700, 400), Image.Resampling.LANCZOS)
        
        # Convert to PhotoImage
        photo = ImageTk.PhotoImage(display_img)
        
        # Display
        img_label = tk.Label(self.image_frame, image=photo, bg="#1a1a2e")
        img_label.image = photo  # Keep reference
        img_label.pack()
        
        self.status_label.config(text="✅ Background removed successfully!")
        self.save_btn.config(state=tk.NORMAL)
        self.remove_btn.config(state=tk.NORMAL)
        
    def save_image(self):
        if not self.result_image:
            return
            
        file_path = filedialog.asksaveasfilename(
            defaultextension=".png",
            filetypes=[("PNG files", "*.png"), ("All files", "*.*")]
        )
        
        if file_path:
            self.result_image.save(file_path)
            messagebox.showinfo("Success", f"Image saved to:\n{file_path}")
            
    def _reset_ui(self):
        self.progress.stop()
        self.progress.pack_forget()
        self.status_label.config(text="Ready")
        self.remove_btn.config(state=tk.NORMAL)

if __name__ == "__main__":
    root = tk.Tk()
    app = BackgroundRemoverApp(root)
    root.mainloop()

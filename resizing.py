
from PIL import Image, ImageOps
import os

# Input and output folder paths
input_folder = "C:/Users/user/OneDrive/Desktop/new train/water lily"  # Change this
output_folder = "C:/Users/user/OneDrive/Desktop/new train/waterlily"  # Change this


# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Loop through all files in the input folder
for filename in os.listdir(input_folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg")):  # Process only images
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)

        # Convert RGBA (transparent images) to RGB (white background)
        if img.mode == "RGBA":
            img = img.convert("RGB")

        # Resize while keeping aspect ratio
        img.thumbnail((650, 650), Image.LANCZOS)

        # Create a white canvas (650x650)
        new_img = Image.new("RGB", (650, 650), (255, 255, 255))
        
        # Paste the resized image at the center
        x_offset = (650 - img.width) // 2
        y_offset = (650 - img.height) // 2
        new_img.paste(img, (x_offset, y_offset))

        # Save with 50% quality
        output_path = os.path.join(output_folder, filename)
        new_img.save(output_path, quality=35)  # Lower quality to reduce file size

        print(f"Resized, added padding, and saved with 50% quality: {output_path}")

print("All images processed successfully!")

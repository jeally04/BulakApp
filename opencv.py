import cv2
import numpy as np
import os
import random

# Input and output folder paths
input_folder = "C:/Users/user/OneDrive/Desktop/new train/water lily"  # Change this
output_folder = "C:/Users/user/OneDrive/Desktop/new train/waterlily_augmented"  # Change this

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)

def augment_image(image):
    """ Apply random rotations, flips, and brightness adjustments. """
    
    # Random rotation (-30 to 30 degrees)
    angle = random.uniform(-30, 30)
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    image = cv2.warpAffine(image, M, (w, h), borderMode=cv2.BORDER_REFLECT)

    # Random horizontal flip (50% chance)
    if random.random() > 0.5:
        image = cv2.flip(image, 1)  # 1 = horizontal flip

    # Random vertical flip (50% chance)
    if random.random() > 0.5:
        image = cv2.flip(image, 0)  # 0 = vertical flip

    # Random brightness adjustment
    brightness_factor = random.uniform(0.7, 1.3)  # Scale brightness (70% to 130%)
    image = np.clip(image * brightness_factor, 0, 255).astype(np.uint8)

    return image

# Loop through images in the input folder
for filename in os.listdir(input_folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg")):  # Process only images
        img_path = os.path.join(input_folder, filename)
        image = cv2.imread(img_path)  # Read image

        if image is None:
            print(f"Failed to load image: {img_path}")
            continue

        # Resize to 640x640 (keeping aspect ratio)
        h, w = image.shape[:2]
        scale = 640 / max(h, w)  # Scale factor to fit within 640x640
        new_w, new_h = int(w * scale), int(h * scale)
        image_resized = cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_AREA)

        # Create a 640x640 white background and center the resized image
        new_image = np.ones((640, 640, 3), dtype=np.uint8) * 255  # White background
        x_offset = (640 - new_w) // 2
        y_offset = (640 - new_h) // 2
        new_image[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = image_resized

        # Apply augmentation
        new_image = augment_image(new_image)

        # Normalize pixel values to range [0,1]
        normalized_image = new_image.astype(np.float32) / 255.0

        # Convert back to uint8 for saving
        output_image = (normalized_image * 255).astype(np.uint8)

        # Save the processed image
        output_path = os.path.join(output_folder, filename)
        cv2.imwrite(output_path, output_image)

        print(f"Processed and saved: {output_path}")

print("All images processed successfully!")

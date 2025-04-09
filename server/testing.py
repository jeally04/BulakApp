from ultralytics import YOLO
import shutil
import os

# Load the YOLO model with the pre-trained weights
model = YOLO("C:/Users/user/OneDrive/Documents/GitHub/Problema/train/weights/best.pt")

# Perform inference on the video
results = model(
    "C:/Users/user/OneDrive/Desktop/New Folder/sample3.mp4",
    save=True,  # Save the results (annotated video)
    save_txt=True  # Save detection results in text files
)

# YOLO automatically saves results in 'runs/detect/predictX' or 'expX' folders
default_output_dir = "runs/detect"

# Find the latest output directory (predict, predict1, exp, exp1, etc.)
output_folders = sorted(
    [d for d in os.listdir(default_output_dir) if os.path.isdir(os.path.join(default_output_dir, d))],
    key=lambda x: os.path.getmtime(os.path.join(default_output_dir, x))
)

# Check if there are any output folders
if output_folders:
    latest_output_dir = os.path.join(default_output_dir, output_folders[-1])  # Last modified folder

    # Define the custom output directory where you want to move the results
    output_dir = "C:/Users/user/OneDrive/Desktop"

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Move the results folder to the specified directory
    shutil.move(latest_output_dir, os.path.join(output_dir, os.path.basename(latest_output_dir)))

    print(f"Video and results saved in: {output_dir}")
else:
    print("No output folders found. Please check the YOLO inference process.")

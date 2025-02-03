from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image, UnidentifiedImageError
import numpy as np
import io
import os

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware (for frontend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Use your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the YOLO model
MODEL_PATH = os.path.join(
    "C:/Users/user/OneDrive/Documents/GitHub/Problema/train3/weights/best.pt"
)
model = YOLO(MODEL_PATH)

# Mapping class IDs to flower names
CLASS_NAMES = {
    0: "Red Rose",
    1: "Pink Rose",
    2: "White Rose",
    3: "Desert Rose",
    4: "Sun Flower",
    5: "Gumamela",
    6: "Yellow Rose",
    7: "Anthurium",
    8: "Yellow Alder",
    9: "Chrysanthenum",
    10: "Yellow Chrysanthenum",
    11: "Magenta Chrysanthenum",
    12: "White Chrysanthenum",
}

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    try:
        # Check file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

        # Read and load the image
        image_data = await file.read()
        try:
            image = Image.open(io.BytesIO(image_data))
        except UnidentifiedImageError:
            raise HTTPException(status_code=400, detail="Could not process the image. Make sure it's valid.")

        # Convert to numpy array for YOLO model
        results = model.predict(source=np.array(image))

        # Extract detections with flower names
        detections = []
        print("\n--- DETECTION RESULTS ---")  # Header for terminal output
        for box in results[0].boxes:
            class_id = int(box.cls[0])
            flower_name = CLASS_NAMES.get(class_id, "Unknown Flower")
            confidence = float(box.conf[0])
            bbox = box.xyxy.tolist()[0]  # Bounding box coordinates

            detection = {
                "flower_name": flower_name,
                "confidence": confidence,
                "bbox": bbox,
            }
            detections.append(detection)

            # Print detected flower in the terminal
            print(f"Flower: {flower_name}, Confidence: {confidence:.2f}, BBox: {bbox}")

        print("-------------------------\n")  # Footer for terminal output

        # Return the detection results
        return {"detections": detections}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

def detect_objects(image_path: str):
    """
    Function for testing or batch detection from image paths.
    """
    print(f"Processing image: {image_path}")  # Debugging line
    results = model(image_path)
    
    detections = []
    print("\n--- BATCH DETECTION RESULTS ---")  # Header for terminal output
    for index, row in results.pandas().xyxy[0].iterrows():
        class_id = int(row["class"])
        flower_name = CLASS_NAMES.get(class_id, "Unknown Flower")
        confidence = float(row["confidence"])
        bbox = [row["xmin"], row["ymin"], row["xmax"], row["ymax"]]

        detections.append({
            "flower_name": flower_name,
            "confidence": confidence,
            "bbox": bbox,
        })

        # Print detected flower in the terminal
        print(f"Flower: {flower_name}, Confidence: {confidence:.2f}, BBox: {bbox}")

    print("-------------------------------\n")  # Footer for terminal output
    return detections  # Convert results to JSON

# Instructions to run:
# Start the server with: uvicorn yolo_server:app --host 0.0.0.0 --port 8000

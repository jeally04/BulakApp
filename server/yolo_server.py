from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image, UnidentifiedImageError
import numpy as np
import io
import os

# Initialize FastAPI app
app = FastAPI()

# CORS configuration to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO model
MODEL_PATH = "C:/Users/user/OneDrive/Documents/GitHub/Problema/train3/weights/best.pt"
model = YOLO(MODEL_PATH)

# Mapping class IDs to flower names
CLASS_NAMES = {
    0: "Red Rose",
    1: "Pink Rose",
    2: "White Rose",
    3: "Desert Rose",
    4: "Sunflower",
    5: "Gumamela",
    6: "Yellow Rose",
    7: "Anthurium",
    8: "Yellow Alder",
    9: "Chrysanthemum",
    10: "Yellow Chrysanthemum",
    11: "Magenta Chrysanthemum",
    12: "White Anthurium",
}

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    try:
        # Ensure the uploaded file is an image
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

        # Read and process image
        image_data = await file.read()
        try:
            image = Image.open(io.BytesIO(image_data)).convert("RGB")
        except UnidentifiedImageError:
            raise HTTPException(status_code=400, detail="Invalid image format.")

        # Convert image to numpy array
        img_array = np.array(image)

        # Perform object detection
        results = model.predict(source=img_array, conf=0.4)  # Adjust confidence threshold if needed

        detections = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0].item())  # Convert tensor to integer
                confidence = float(box.conf[0].item())  # Convert tensor to float
                bbox = [float(coord) for coord in box.xyxy[0].tolist()]  # Convert bbox to list

                detections.append({
                    "flower_name": CLASS_NAMES.get(class_id, "Unknown Flower"),
                    "confidence": confidence,
                    "bbox": bbox,
                })

        return {"detections": detections}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

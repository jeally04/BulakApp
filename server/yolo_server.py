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
    "C:/Users/user/OneDrive/Desktop/BulakApp4/train3/weights", "best.pt"
)
model = YOLO(MODEL_PATH)

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

        # Extract detections
        detections = []
        for box in results[0].boxes:
            detection = {
                "class": int(box.cls[0]),  # Class of the detected object
                "confidence": float(box.conf[0]),  # Confidence score
                "bbox": box.xyxy.tolist()[0],  # [xmin, ymin, xmax, ymax]
            }
            detections.append(detection)

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
    print(f"Detection results: {results.pandas().xyxy[0]}")  # Show detected objects
    return results.pandas().xyxy[0].to_dict(orient="records")  # Convert results to JSON

# Instructions to run:
# Start the server with: uvicorn yolo_server:app --host 0.0.0.0 --port 8000

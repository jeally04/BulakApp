from fastapi import FastAPI, File, UploadFile, HTTPException, Query, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image, UnidentifiedImageError
import numpy as np
import io
import mysql.connector
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS Configuration (Frontend Connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # for local dev
        "https://bulakappclient.onrender.com"  # your deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO Model
MODEL_PATH = "C:/Users/user/OneDrive/Documents/GitHub/Problema/best.onnx"  # Change to your model's path
model = YOLO(MODEL_PATH)

# Flower Class Mapping (Change these according to your trained model)
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

# Database connection function
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DATABASE_HOST"),
            port=os.getenv("DATABASE_PORT"),
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            database=os.getenv("DATABASE_NAME")
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        raise HTTPException(status_code=500, detail="Database connection failed.")

@app.post("/detect/")
async def detect(
    file: UploadFile = File(...),
    user_id: int = Query(None, description="User ID (only required for uploads)"),
    live: bool = Query(False, description="True for live detection, False for upload detection")
):
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

        # Resize image to match YOLO training size
        image = image.resize((640, 640))

        # Run YOLO detection
        results = model.predict(image, conf=0.25, iou=0.4)  # Lower confidence & apply NMS

        detections = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0].item())
                confidence = float(box.conf[0].item())
                bbox = box.xyxy.tolist()[0]  # [xmin, ymin, xmax, ymax]
                flower_name = CLASS_NAMES.get(class_id, "Unknown Flower")

                detections.append({
                    "flower_name": flower_name,
                    "confidence": confidence,
                    "bbox": bbox,
                })

                # Save detection to database only if it's an upload (not live)
                if not live and user_id:
                    conn = get_db_connection()
                    cursor = conn.cursor()
                    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                    cursor.execute(
                        "INSERT INTO detection_history (user_id, flower_name, confidence, detected_at) VALUES (%s, %s, %s, %s)",
                        (user_id, flower_name, confidence, timestamp)
                    )
                    conn.commit()
                    cursor.close()
                    conn.close()

        return {"detections": detections} if detections else {"message": "No flowers detected."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/history/{user_id}")
async def get_user_history(user_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT id, flower_name, confidence, detected_at FROM detection_history WHERE user_id = %s ORDER BY detected_at DESC", (user_id,))
        history = cursor.fetchall()

        cursor.close()
        conn.close()

        return {"history": history} if history else {"message": "No detection history found."}

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving history: {str(e)}")

@app.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        frame = await websocket.receive_bytes()
        try:
            image = Image.open(io.BytesIO(frame)).convert("RGB")
            image = image.resize((640, 640))
            results = model.predict(image, conf=0.25, iou=0.4)

            detections = []
            for result in results:
                for box in result.boxes:
                    class_id = int(box.cls[0].item())
                    confidence = float(box.conf[0].item())
                    bbox = box.xyxy.tolist()[0]
                    flower_name = CLASS_NAMES.get(class_id, "Unknown Flower")
                    detections.append({
                        "flower_name": flower_name,
                        "confidence": confidence,
                        "bbox": bbox
                    })

            await websocket.send_json({"detections": detections})

        except Exception as e:
            await websocket.send_json({"error": f"Error during detection: {str(e)}"})

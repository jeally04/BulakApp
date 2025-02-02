import os
import shutil
from flask import Flask, request, jsonify
from ultralytics import YOLO

app = Flask(__name__)

# Load your trained YOLO model
model = YOLO("path/to/your/best.pt")  # Update with the correct path to your model

@app.route('/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Save the file temporarily
    file_path = os.path.join("uploads", file.filename)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    file.save(file_path)
    
    # Perform inference with the YOLO model
    results = model(file_path, save=True, save_txt=True)  # Saving result as video and txt files
    
    # Find the latest output folder
    output_folders = sorted(
        [d for d in os.listdir('runs/detect') if os.path.isdir(os.path.join('runs/detect', d))],
        key=lambda x: os.path.getmtime(os.path.join('runs/detect', x))
    )
    
    if output_folders:
        latest_output_dir = os.path.join('runs/detect', output_folders[-1])
        result_file = os.path.join(latest_output_dir, 'results.mp4')  # Video with annotations
        
        # Move the result to a desired location
        result_dir = "path/to/desired/folder"
        os.makedirs(result_dir, exist_ok=True)
        shutil.move(latest_output_dir, os.path.join(result_dir, os.path.basename(latest_output_dir)))
        
        return jsonify({
            'message': 'Detection complete',
            'video_url': result_file  # Send the video URL back to the frontend
        })
    else:
        return jsonify({'error': 'No output found'}), 500


if __name__ == '__main__':
    app.run(debug=True)

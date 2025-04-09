// MongoDB Playground for Flower Detection History

// Use your own database name here
use('flowerDetectionDB');

// Insert sample detection history documents
db.getCollection('detection_history').insertMany([
  {
    user_id: 1,
    flower_name: 'Rose',
    confidence: 0.95,
    image_path: '/images/rose1.jpg',
    detected_at: new Date('2024-04-01T10:30:00Z')
  },
  {
    user_id: 2,
    flower_name: 'Tulip',
    confidence: 0.89,
    image_path: '/images/tulip1.jpg',
    detected_at: new Date('2024-04-02T11:45:00Z')
  },
  {
    user_id: 1,
    flower_name: 'Sunflower',
    confidence: 0.92,
    image_path: '/images/sunflower1.jpg',
    detected_at: new Date('2024-04-02T12:15:00Z')
  },
  {
    user_id: 3,
    flower_name: 'Rose',
    confidence: 0.87,
    image_path: '/images/rose2.jpg',
    detected_at: new Date('2024-04-03T09:00:00Z')
  }
]);

// Count how many flowers were detected on April 2nd, 2024
const detectionsOnApril2 = db.getCollection('detection_history').find({
  detected_at: {
    $gte: new Date('2024-04-02T00:00:00Z'),
    $lt: new Date('2024-04-03T00:00:00Z')
  }
}).count();

console.log(`${detectionsOnApril2} flower detections occurred on April 2nd, 2024.`);

// Aggregate total detections grouped by flower type
db.getCollection('detection_history').aggregate([
  {
    $group: {
      _id: '$flower_name',
      totalDetections: { $sum: 1 },
      averageConfidence: { $avg: '$confidence' }
    }
  }
]);

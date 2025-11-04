"""Crop type detector model"""
import tensorflow as tf
from tensorflow import keras
import numpy as np
from typing import Dict
from pathlib import Path
from utils.config import settings


class CropDetector:
    """Detects crop type from images (Maize, Cassava, Tomato)"""
    
    def __init__(self):
        self.model = None
        self.model_path = Path(settings.CROP_DETECTOR_PATH)
        self.class_names = ["maize", "cassava", "tomato"]
        self.input_shape = (224, 224, 3)
    
    async def load_model(self):
        """Load pre-trained crop detection model"""
        try:
            if self.model_path.exists():
                self.model = tf.keras.models.load_model(str(self.model_path))
                print(f"✅ Crop detector model loaded from {self.model_path}")
            else:
                print(f"⚠️ Model not found at {self.model_path}, creating new model...")
                await self._create_model()
        except Exception as e:
            print(f"⚠️ Error loading model: {e}, creating new model...")
            await self._create_model()
    
    async def _create_model(self):
        """Create new crop detection model using transfer learning"""
        base_model = tf.keras.applications.MobileNetV2(
            input_shape=self.input_shape,
            include_top=False,
            weights='imagenet'
        )
        
        base_model.trainable = False
        
        self.model = tf.keras.Sequential([
            base_model,
            tf.keras.layers.GlobalAveragePooling2D(),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(3, activation='softmax', name='predictions')
        ])
        
        self.model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        print("✅ New crop detector model created")
    
    async def predict(self, image: np.ndarray) -> Dict:
        """Predict crop type from image"""
        if self.model is None:
            await self.load_model()
        
        # Preprocess image
        image_array = np.expand_dims(image, axis=0)
        image_array = tf.keras.applications.mobilenet_v2.preprocess_input(image_array)
        
        # Predict
        predictions = self.model.predict(image_array, verbose=0)
        
        # Get top prediction
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])
        
        # Get all classes with confidence
        all_classes = {
            self.class_names[i]: float(predictions[0][i])
            for i in range(len(self.class_names))
        }
        
        return {
            "class": self.class_names[class_idx],
            "confidence": confidence,
            "all_classes": all_classes
        }


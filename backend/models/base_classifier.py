"""Base classifier for disease detection"""
import tensorflow as tf
import numpy as np
from typing import Dict
from pathlib import Path


class BaseDiseaseClassifier:
    """Base class for disease classifiers"""
    
    def __init__(self, model_path: str, class_names: list, severity_map: dict, input_shape=(224, 224, 3)):
        self.model = None
        self.model_path = Path(model_path)
        self.class_names = class_names
        self.severity_map = severity_map
        self.input_shape = input_shape
    
    async def load_model(self):
        """Load pre-trained disease classifier"""
        try:
            if self.model_path.exists():
                self.model = tf.keras.models.load_model(str(self.model_path))
                print(f"✅ Model loaded from {self.model_path}")
            else:
                print(f"⚠️ Model not found: {self.model_path}, creating new model...")
                await self._create_model()
        except Exception as e:
            print(f"⚠️ Error loading model: {e}, creating new model...")
            await self._create_model()
    
    async def _create_model(self):
        """Create new disease classifier using transfer learning"""
        # Try to load ImageNet weights (requires 3-channel input). If that fails due to
        # shape/weights issues on some TF builds, fall back to random initialization.
        try:
            base_model = tf.keras.applications.EfficientNetB0(
                input_shape=self.input_shape,
                include_top=False,
                weights='imagenet'
            )
        except Exception as e:
            print(f"⚠️ Failed to load EfficientNetB0 with ImageNet weights ({e}). Falling back to weights=None.")
            base_model = tf.keras.applications.EfficientNetB0(
                input_shape=self.input_shape,
                include_top=False,
                weights=None
            )
        
        base_model.trainable = False
        
        self.model = tf.keras.Sequential([
            base_model,
            tf.keras.layers.GlobalAveragePooling2D(),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(len(self.class_names), activation='softmax')
        ])
        
        self.model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        print(f"✅ New model created at {self.model_path}")
    
    async def predict(self, image: np.ndarray) -> Dict:
        """Predict disease from image"""
        if self.model is None:
            await self.load_model()
        
        # Preprocess
        image_array = np.expand_dims(image, axis=0)
        image_array = tf.keras.applications.efficientnet.preprocess_input(image_array)
        
        # Predict
        predictions = self.model.predict(image_array, verbose=0)
        
        # Get top prediction
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])
        disease = self.class_names[class_idx]
        
        return {
            "class": disease,
            "confidence": confidence,
            "severity": self.severity_map.get(disease, "medium")
        }


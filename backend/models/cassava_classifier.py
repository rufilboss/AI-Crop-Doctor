"""Cassava disease classifier"""
from models.base_classifier import BaseDiseaseClassifier
from utils.config import settings


class CassavaDiseaseClassifier(BaseDiseaseClassifier):
    """Detects diseases in cassava crops"""
    
    def __init__(self):
        class_names = [
            "healthy",
            "cassava_mosaic_disease",
            "brown_streak_disease",
            "anthracnose",
            "bacterial_blight"
        ]
        
        severity_map = {
            "healthy": "none",
            "cassava_mosaic_disease": "high",
            "brown_streak_disease": "high",
            "anthracnose": "medium",
            "bacterial_blight": "medium"
        }
        
        super().__init__(
            model_path=settings.CASSAVA_CLASSIFIER_PATH,
            class_names=class_names,
            severity_map=severity_map
        )


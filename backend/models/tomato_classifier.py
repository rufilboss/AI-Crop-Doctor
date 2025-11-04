"""Tomato disease classifier"""
from models.base_classifier import BaseDiseaseClassifier
from utils.config import settings


class TomatoDiseaseClassifier(BaseDiseaseClassifier):
    """Detects diseases in tomato crops"""
    
    def __init__(self):
        class_names = [
            "healthy",
            "early_blight",
            "late_blight",
            "bacterial_spot",
            "leaf_curl",
            "septoria_leaf_spot"
        ]
        
        severity_map = {
            "healthy": "none",
            "early_blight": "medium",
            "late_blight": "high",
            "bacterial_spot": "medium",
            "leaf_curl": "high",
            "septoria_leaf_spot": "low"
        }
        
        super().__init__(
            model_path=settings.TOMATO_CLASSIFIER_PATH,
            class_names=class_names,
            severity_map=severity_map
        )


"""Maize disease classifier"""
from models.base_classifier import BaseDiseaseClassifier
from utils.config import settings


class MaizeDiseaseClassifier(BaseDiseaseClassifier):
    """Detects diseases in maize crops"""
    
    def __init__(self):
        class_names = [
            "healthy",
            "maize_streak_virus",
            "northern_leaf_blight",
            "gray_leaf_spot",
            "common_rust",
            "fall_armyworm"
        ]
        
        severity_map = {
            "healthy": "none",
            "maize_streak_virus": "high",
            "northern_leaf_blight": "medium",
            "gray_leaf_spot": "medium",
            "common_rust": "low",
            "fall_armyworm": "high"
        }
        
        super().__init__(
            model_path=settings.MAIZE_CLASSIFIER_PATH,
            class_names=class_names,
            severity_map=severity_map
        )


"""Disease classifiers manager"""
from typing import Dict, Optional
from models.maize_classifier import MaizeDiseaseClassifier
from models.cassava_classifier import CassavaDiseaseClassifier
from models.tomato_classifier import TomatoDiseaseClassifier


class DiseaseClassifiers:
    """Manages all disease classifiers"""
    
    def __init__(self):
        self.classifiers: Dict[str, BaseDiseaseClassifier] = {
            "maize": MaizeDiseaseClassifier(),
            "cassava": CassavaDiseaseClassifier(),
            "tomato": TomatoDiseaseClassifier()
        }
    
    async def load_models(self):
        """Load all disease classifiers"""
        for crop, classifier in self.classifiers.items():
            await classifier.load_model()
            print(f"✅ {crop.title()} disease classifier loaded")
    
    def get_classifier(self, crop_type: str):
        """Get classifier for specific crop"""
        classifier = self.classifiers.get(crop_type.lower())
        if not classifier:
            raise ValueError(f"Unknown crop type: {crop_type}. Supported: {list(self.classifiers.keys())}")
        return classifier


"""Recommendation service for disease treatments"""
import json
from typing import Dict, List, Optional
from pathlib import Path
from utils.config import settings


class RecommendationService:
    """Provides treatment recommendations for diseases"""
    
    def __init__(self):
        self.disease_db_path = Path(settings.DISEASE_DB_PATH)
        self.treatments_db_path = Path(settings.TREATMENTS_DB_PATH)
        self.disease_db = self._load_disease_db()
        self.treatments_db = self._load_treatments_db()
    
    def _load_disease_db(self) -> Dict:
        """Load disease database"""
        try:
            if self.disease_db_path.exists():
                with open(self.disease_db_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            else:
                print(f"⚠️ Disease database not found at {self.disease_db_path}, using empty database")
                return {}
        except Exception as e:
            print(f"Error loading disease database: {e}")
            return {}
    
    def _load_treatments_db(self) -> Dict:
        """Load treatments database"""
        try:
            if self.treatments_db_path.exists():
                with open(self.treatments_db_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            else:
                print(f"⚠️ Treatments database not found at {self.treatments_db_path}, using empty database")
                return {}
        except Exception as e:
            print(f"Error loading treatments database: {e}")
            return {}
    
    async def get_recommendations(
        self, 
        crop_type: str, 
        disease: str, 
        language: str = "en"
    ) -> Dict:
        """Get treatment recommendations for disease"""
        disease_id = f"{crop_type}_{disease}"
        
        # Get disease info
        disease_info = self.disease_db.get(disease_id, {})
        
        # Get treatments
        treatments = disease_info.get("treatments", [])
        
        # Translate if needed
        if language != "en" and treatments:
            treatments = self._translate_treatments(treatments, language)
        
        return {
            "disease_name": disease_info.get("name", {}).get(language, disease_info.get("name", {}).get("en", disease)),
            "symptoms": disease_info.get("symptoms", {}).get(language, disease_info.get("symptoms", {}).get("en", [])),
            "treatments": treatments,
            "prevention": disease_info.get("prevention", {}).get(language, disease_info.get("prevention", {}).get("en", [])),
            "severity": disease_info.get("severity", "medium"),
            "urgency": disease_info.get("urgency", "medium")
        }
    
    def _translate_treatments(self, treatments: List[Dict], language: str) -> List[Dict]:
        """Translate treatments to target language"""
        translated = []
        for treatment in treatments:
            translated_treatment = treatment.copy()
            if language in treatment.get("method_translations", {}):
                translated_treatment["method"] = treatment["method_translations"][language]
            if language in treatment.get("description_translations", {}):
                translated_treatment["description"] = treatment["description_translations"][language]
            if "steps_translations" in treatment and language in treatment["steps_translations"]:
                translated_treatment["steps"] = treatment["steps_translations"][language]
            translated.append(translated_treatment)
        return translated


"""Configuration settings for the application"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    APP_NAME: str = "AI Crop Doctor API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"]
    API_V1_PREFIX: str = "/api"
    
    # Database
    DATABASE_URL: str = "sqlite:///./crop_doctor.db"
    
    # Model paths
    MODELS_DIR: str = "models"
    CROP_DETECTOR_PATH: str = "models/crop_detector.h5"
    MAIZE_CLASSIFIER_PATH: str = "models/maize_disease_classifier.h5"
    CASSAVA_CLASSIFIER_PATH: str = "models/cassava_disease_classifier.h5"
    TOMATO_CLASSIFIER_PATH: str = "models/tomato_disease_classifier.h5"
    
    # Data paths
    DATA_DIR: str = "data"
    DISEASE_DB_PATH: str = "data/disease_database.json"
    TREATMENTS_DB_PATH: str = "data/treatments.json"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()


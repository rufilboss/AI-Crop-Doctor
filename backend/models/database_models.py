"""Database models"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from utils.database import Base


class DetectionHistory(Base):
    """Detection history model"""
    __tablename__ = "detection_history"
    
    id = Column(Integer, primary_key=True, index=True)
    crop_type = Column(String(50), nullable=False)
    disease = Column(String(100), nullable=False)
    confidence = Column(Float, nullable=False)
    severity = Column(String(20), nullable=False)
    image_path = Column(String(255), nullable=True)
    image_data = Column(Text, nullable=True)  # Base64 encoded image
    language = Column(String(10), default="en")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


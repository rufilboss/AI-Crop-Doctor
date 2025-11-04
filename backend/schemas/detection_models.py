"""Pydantic models for detection API"""
from pydantic import BaseModel
from typing import Optional, Dict, List


class DetectionResponse(BaseModel):
    """Response model for disease detection"""
    crop_type: str
    disease: str
    confidence: float
    severity: str
    recommendations: Dict


class CropDetectionResponse(BaseModel):
    """Response model for crop type detection"""
    crop_type: str
    confidence: float
    crops: Dict[str, float]


class BatchDetectionResponse(BaseModel):
    """Response model for batch detection"""
    results: List[DetectionResponse]
    total: int
    successful: int
    failed: int


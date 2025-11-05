"""Detection API routes"""
from fastapi import APIRouter, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse
from typing import Optional
import numpy as np
from PIL import Image
import io

from utils.image_processor import process_image
from schemas.detection_models import DetectionResponse, CropDetectionResponse
from services.recommendation_service import RecommendationService

router = APIRouter()


@router.post("/crop-type", response_model=CropDetectionResponse)
async def detect_crop_type(
    request: Request,
    file: UploadFile = File(...)
):
    """Detect crop type from image"""
    try:
        # Read and process image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        processed_image = process_image(image, target_size=(224, 224))
        
        # Detect crop type
        crop_detector = request.app.state.crop_detector
        crop_prediction = await crop_detector.predict(processed_image)
        
        return CropDetectionResponse(
            crop_type=crop_prediction["class"],
            confidence=crop_prediction["confidence"],
            crops=crop_prediction["all_classes"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/disease", response_model=DetectionResponse)
async def detect_disease(
    request: Request,
    file: UploadFile = File(...),
    crop_type: Optional[str] = None,
    language: str = "en"
):
    """Detect disease in crop image"""
    try:
        # Read and process image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        processed_image = process_image(image, target_size=(224, 224))
        
        # Detect crop type if not provided
        crop_detector = request.app.state.crop_detector
        if not crop_type:
            crop_prediction = await crop_detector.predict(processed_image)
            crop_type = crop_prediction["class"]
        
        # Detect disease
        disease_classifiers = request.app.state.disease_classifiers
        disease_classifier = disease_classifiers.get_classifier(crop_type)
        disease_prediction = await disease_classifier.predict(processed_image)
        
        # Get recommendations
        recommendation_service = RecommendationService()
        recommendations = await recommendation_service.get_recommendations(
            crop_type, disease_prediction["class"], language
        )
        
        return DetectionResponse(
            crop_type=crop_type,
            disease=disease_prediction["class"],
            confidence=disease_prediction["confidence"],
            severity=disease_prediction["severity"],
            recommendations=recommendations
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/full", response_model=DetectionResponse)
async def full_detection(
    request: Request,
    file: UploadFile = File(...),
    language: str = "en"
):
    """Complete detection pipeline: crop + disease + recommendations"""
    try:
        # Read and process image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        processed_image = process_image(image, target_size=(224, 224))
        
        # Detect crop type
        crop_detector = request.app.state.crop_detector
        crop_prediction = await crop_detector.predict(processed_image)
        crop_type = crop_prediction["class"]
        
        # Detect disease
        disease_classifiers = request.app.state.disease_classifiers
        disease_classifier = disease_classifiers.get_classifier(crop_type)
        disease_prediction = await disease_classifier.predict(processed_image)
        
        # Get recommendations
        recommendation_service = RecommendationService()
        recommendations = await recommendation_service.get_recommendations(
            crop_type, disease_prediction["class"], language
        )
        
        return DetectionResponse(
            crop_type=crop_type,
            disease=disease_prediction["class"],
            confidence=disease_prediction["confidence"],
            severity=disease_prediction["severity"],
            recommendations=recommendations
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


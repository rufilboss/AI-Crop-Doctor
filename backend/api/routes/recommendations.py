"""Recommendations API routes"""
from fastapi import APIRouter, HTTPException
from typing import Optional
from services.recommendation_service import RecommendationService

router = APIRouter()


@router.get("/{crop_type}/{disease}")
async def get_recommendations(
    crop_type: str,
    disease: str,
    language: str = "en"
):
    """Get treatment recommendations for a specific disease"""
    try:
        recommendation_service = RecommendationService()
        recommendations = await recommendation_service.get_recommendations(
            crop_type, disease, language
        )
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


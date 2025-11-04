"""History API routes"""
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from typing import List
from utils.database import get_db
from models.database_models import DetectionHistory
from schemas.detection_models import DetectionResponse

router = APIRouter()


@router.get("/")
async def get_history(skip: int = 0, limit: int = 100):
    """Get detection history"""
    db = next(get_db())
    try:
        history = db.query(DetectionHistory).offset(skip).limit(limit).all()
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


@router.get("/{detection_id}")
async def get_detection(detection_id: int):
    """Get specific detection by ID"""
    db = next(get_db())
    try:
        detection = db.query(DetectionHistory).filter(DetectionHistory.id == detection_id).first()
        if not detection:
            raise HTTPException(status_code=404, detail="Detection not found")
        return detection
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


@router.post("/")
async def save_detection(detection: dict):
    """Save detection to history"""
    db = next(get_db())
    try:
        db_detection = DetectionHistory(
            crop_type=detection.get("crop_type"),
            disease=detection.get("disease"),
            confidence=detection.get("confidence"),
            severity=detection.get("severity"),
            language=detection.get("language", "en")
        )
        db.add(db_detection)
        db.commit()
        db.refresh(db_detection)
        return db_detection
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


@router.delete("/{detection_id}")
async def delete_detection(detection_id: int):
    """Delete detection from history"""
    db = next(get_db())
    try:
        detection = db.query(DetectionHistory).filter(DetectionHistory.id == detection_id).first()
        if not detection:
            raise HTTPException(status_code=404, detail="Detection not found")
        db.delete(detection)
        db.commit()
        return {"message": "Detection deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


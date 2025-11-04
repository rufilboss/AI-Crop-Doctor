"""Main FastAPI application"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn

from api.routes import detection, recommendations, history, languages
from utils.database import init_db
from utils.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    print("🌾 Starting AI Crop Doctor API...")
    await init_db()
    print("✅ Database initialized")
    
    # Load models
    from models.crop_detector import CropDetector
    from models.disease_classifiers import DiseaseClassifiers
    
    app.state.crop_detector = CropDetector()
    app.state.disease_classifiers = DiseaseClassifiers()
    
    await app.state.crop_detector.load_model()
    await app.state.disease_classifiers.load_models()
    
    print("✅ Models loaded")
    yield
    
    print("🛑 Shutting down AI Crop Doctor API...")


app = FastAPI(
    title="AI Crop Doctor API",
    description="Disease detection for Maize, Cassava, and Tomatoes",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(detection.router, prefix="/api/detect", tags=["Detection"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(history.router, prefix="/api/history", tags=["History"])
app.include_router(languages.router, prefix="/api/languages", tags=["Languages"])


@app.get("/")
async def root():
    return JSONResponse({
        "message": "AI Crop Doctor API",
        "version": "1.0.0",
        "status": "healthy",
        "supported_crops": ["maize", "cassava", "tomato"]
    })


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse({
        "status": "healthy",
        "models_loaded": True
    })


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


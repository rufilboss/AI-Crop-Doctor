"""Languages API routes"""
from fastapi import APIRouter
from typing import List, Dict

router = APIRouter()


@router.get("/")
async def get_languages() -> List[Dict[str, str]]:
    """Get available languages"""
    return [
        {"code": "en", "name": "English"},
        {"code": "ha", "name": "Hausa"},
        {"code": "yo", "name": "Yoruba"},
        {"code": "ig", "name": "Igbo"},
        {"code": "pidgin", "name": "Pidgin English"}
    ]


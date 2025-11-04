"""Image processing utilities"""
import numpy as np
from PIL import Image
from typing import Tuple


def process_image(
    image: Image.Image, 
    target_size: Tuple[int, int] = (224, 224)
) -> np.ndarray:
    """
    Process image for model input:
    1. Convert to RGB
    2. Resize to target size
    3. Normalize pixel values
    """
    # Convert to RGB if needed
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize
    image = image.resize(target_size, Image.Resampling.LANCZOS)
    
    # Convert to numpy array
    image_array = np.array(image, dtype=np.float32)
    
    # Normalize to [0, 1]
    image_array = image_array / 255.0
    
    return image_array


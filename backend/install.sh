#!/bin/bash

# Installation script for AI Crop Doctor Backend
# Handles Python 3.13 compatibility issues

echo "🌾 Installing AI Crop Doctor Backend Dependencies..."

# Check Python version
PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "Python version: $(python3 --version)"

# Upgrade pip, setuptools, and wheel first
echo "📦 Upgrading pip, setuptools, and wheel..."
pip install --upgrade pip setuptools wheel

# Install system dependencies for Pillow (if on Linux)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "📦 Installing system dependencies for Pillow..."
    if command -v apt-get &> /dev/null; then
        echo "Please run: sudo apt-get install -y python3-dev libjpeg-dev zlib1g-dev libtiff-dev libfreetype6-dev liblcms2-dev libwebp-dev"
    fi
fi

# Install core dependencies first (without TensorFlow)
echo "📦 Installing core dependencies..."
pip install fastapi uvicorn[standard] python-multipart
pip install pydantic pydantic-settings
pip install sqlalchemy python-jose[cryptography] python-dotenv

# Install numpy first (required for TensorFlow)
echo "📦 Installing NumPy..."
pip install numpy

# Install Pillow with specific version for Python 3.13
echo "📦 Installing Pillow..."
pip install --upgrade pillow || {
    echo "⚠️  Pillow installation failed. Trying alternative..."
    pip install --upgrade 'pillow>=10.3.0' --no-cache-dir
}

# Install TensorFlow
echo "📦 Installing TensorFlow..."
pip install tensorflow || {
    echo "⚠️  TensorFlow installation failed. Trying TensorFlow CPU..."
    pip install tensorflow-cpu
}

# Verify installation
echo ""
echo "✅ Verifying installation..."
python3 -c "import fastapi; print('✓ FastAPI:', fastapi.__version__)" || echo "✗ FastAPI failed"
python3 -c "import numpy; print('✓ NumPy:', numpy.__version__)" || echo "✗ NumPy failed"
python3 -c "import PIL; print('✓ Pillow:', PIL.__version__)" || echo "✗ Pillow failed"
python3 -c "import tensorflow as tf; print('✓ TensorFlow:', tf.__version__)" || echo "✗ TensorFlow failed"

echo ""
echo "🎉 Installation complete!"
echo ""
echo "If any packages failed, try:"
echo "  1. Install system dependencies for Pillow"
echo "  2. Use Python 3.11 or 3.12 instead"
echo "  3. Check INSTALL_TROUBLESHOOTING.md for more help"


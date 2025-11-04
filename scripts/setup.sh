#!/bin/bash

echo "🌾 Setting up AI Crop Doctor..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p backend/models
mkdir -p backend/data
mkdir -p data/datasets/{maize,cassava,tomato}

# Setup backend
echo "🐍 Setting up backend..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
cd ..

# Setup frontend
echo "⚛️  Setting up frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the backend:"
echo "  cd backend && source venv/bin/activate && python main.py"
echo ""
echo "To start the frontend:"
echo "  cd frontend && npm run dev"


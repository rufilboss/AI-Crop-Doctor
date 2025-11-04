# 🚀 AI Crop Doctor - Setup Guide

## Quick Start

### Option 1: Automated Setup (Recommended)

Run the setup script:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create required directories:**
```bash
mkdir -p models data
```

5. **Start the server:**
```bash
python main.py
# or
python run.py
```

The API will be available at `http://localhost:8000`

#### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:8000
```

4. **Start development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📋 Prerequisites

- **Python 3.8+** - For backend
- **Node.js 18+** - For frontend
- **npm or yarn** - Package manager
- **TensorFlow** - Will be installed via pip (Note: Large package, may take time)

## 🎯 First Run

On first run, the ML models will be automatically created if pre-trained models are not found. These are lightweight models using transfer learning:

- **Crop Detector**: MobileNetV2-based (detects Maize, Cassava, Tomato)
- **Disease Classifiers**: EfficientNetB0-based (one per crop)

Note: These are starter models. For production use, you should train models with actual crop disease datasets.

## 🔧 Configuration

### Backend Configuration

Edit `backend/.env` or modify `backend/utils/config.py`:

- `ALLOWED_ORIGINS`: CORS origins for frontend
- `DATABASE_URL`: Database connection string
- `MODELS_DIR`: Directory for ML models
- `DISEASE_DB_PATH`: Path to disease database JSON

### Frontend Configuration

Edit `frontend/.env`:

- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

## 📁 Project Structure

```
AI-Crop-Doctor/
├── backend/                 # FastAPI backend
│   ├── api/routes/         # API endpoints
│   ├── models/             # ML model wrappers
│   ├── services/          # Business logic
│   ├── schemas/           # Pydantic models
│   ├── utils/             # Utilities
│   ├── main.py            # FastAPI app entry
│   └── requirements.txt   # Python dependencies
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React contexts
│   │   ├── services/    # API clients
│   │   └── locales/     # Translation files
│   ├── package.json      # Node dependencies
│   └── vite.config.ts    # Vite config
│
├── data/                  # Data files
│   └── disease_database.json  # Disease information
│
└── scripts/               # Utility scripts
    └── setup.sh          # Setup script
```

## 🌐 Available Languages

The application supports 5 languages:
- English (en)
- Hausa (ha)
- Yoruba (yo)
- Igbo (ig)
- Pidgin English (pidgin)

Switch languages using the dropdown in the header.

## 🔍 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Testing the Application

1. **Start Backend:**
```bash
cd backend
source venv/bin/activate
python main.py
```

2. **Start Frontend (in another terminal):**
```bash
cd frontend
npm run dev
```

3. **Open Browser:**
Navigate to `http://localhost:3000`

4. **Test Detection:**
- Click "Detect Disease"
- Upload an image or take a photo
- View results with recommendations

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in backend/main.py or backend/run.py
uvicorn.run("main:app", host="0.0.0.0", port=8001)
```

**TensorFlow installation issues:**
```bash
# For CPU-only (faster install)
pip install tensorflow-cpu

# For GPU support
pip install tensorflow
```

**Model loading errors:**
- Models will be auto-created on first run
- Ensure `models/` directory exists and is writable

### Frontend Issues

**Port already in use:**
- Change port in `frontend/vite.config.ts`

**API connection errors:**
- Ensure backend is running on the correct port
- Check `VITE_API_URL` in `frontend/.env`

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Next Steps

1. **Train Models**: Replace starter models with trained models on real crop disease datasets
2. **Expand Disease Database**: Add more diseases and treatments to `data/disease_database.json`
3. **Add Authentication**: Implement user authentication for history tracking
4. **Deploy**: Follow deployment guides for production

## 🤝 Support

For issues or questions, please refer to the main documentation files:
- `AI_CROP_DOCTOR_ROADMAP.md` - Development roadmap
- `AI_CROP_DOCTOR_IMPLEMENTATION_GUIDE.md` - Implementation details
- `README.md` - Project overview


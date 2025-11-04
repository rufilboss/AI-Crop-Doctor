# 🌾 AI Crop Doctor

AI-powered crop disease detection web application for Nigerian farmers. Detect diseases in Maize, Cassava, and Tomatoes with instant results and treatment recommendations in multiple local languages.

## ✨ Features

- 🔍 **AI-Powered Detection**: Advanced machine learning models for accurate disease identification
- 📸 **Image Upload & Camera**: Upload images or take photos directly from your device
- 🌍 **Multi-Language Support**: Available in English, Hausa, Yoruba, Igbo, and Pidgin English
- 💊 **Treatment Recommendations**: Get expert treatment and prevention advice
- 📊 **Detection History**: Track your past detections
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 📱 **Mobile-First**: Optimized for mobile devices

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create necessary directories:
```bash
mkdir -p models data
```

5. Run the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
AI-Crop-Doctor/
├── backend/
│   ├── api/
│   │   └── routes/          # API endpoints
│   ├── models/              # ML model wrappers
│   ├── services/            # Business logic
│   ├── schemas/             # Pydantic models
│   ├── utils/               # Utilities
│   └── main.py              # FastAPI app
├── frontend/
│   ├── src/
│   │   ├── pages/           # React pages
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React contexts
│   │   ├── services/       # API clients
│   │   └── locales/         # Translation files
│   └── package.json
└── data/                    # Disease database
```

## 🎯 Supported Crops

- **Maize**: Maize Streak Virus, Northern Leaf Blight, Gray Leaf Spot, Common Rust, Fall Armyworm
- **Cassava**: Cassava Mosaic Disease, Brown Streak Disease, Anthracnose, Bacterial Blight
- **Tomato**: Early Blight, Late Blight, Bacterial Spot, Leaf Curl, Septoria Leaf Spot

## 🌐 API Endpoints

### Detection
- `POST /api/detect/crop-type` - Detect crop type
- `POST /api/detect/disease` - Detect disease
- `POST /api/detect/full` - Full detection pipeline

### Recommendations
- `GET /api/recommendations/{crop_type}/{disease}` - Get treatment recommendations

### History
- `GET /api/history` - Get detection history
- `POST /api/history` - Save detection
- `DELETE /api/history/{id}` - Delete detection

### Languages
- `GET /api/languages` - Get available languages

## 🛠️ Technology Stack

### Backend
- FastAPI - Modern Python web framework
- TensorFlow/Keras - Machine learning models
- SQLAlchemy - Database ORM
- Pydantic - Data validation

### Frontend
- React 18 - UI library
- TypeScript - Type safety
- Tailwind CSS - Styling
- Framer Motion - Animations
- React Router - Navigation
- i18next - Internationalization
- Axios - HTTP client

## 📝 Notes

- The ML models will be created automatically on first run if pre-trained models are not available
- For production use, you should train models with actual crop disease datasets
- The disease database (`data/disease_database.json`) should be populated with comprehensive disease information

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

See LICENSE file for details.

## 🙏 Acknowledgments

Built for Nigerian farmers to help improve crop health and yield.

# Navigation Frontend

## Quick Start
1. Copy `.env.example` to `.env` and fill in values:
   - REACT_APP_GOOGLE_MAPS_API_KEY
   - REACT_APP_BACKEND_URL (optional; defaults to http://localhost:3001)
   - REACT_APP_DISABLE_BACKEND (optional; `true` to use mock responses)

2. Install dependencies and run:
   npm install
   npm start

## Notes
- If you do not have a Google Maps API key, the map area shows a placeholder.
- If the backend is not running, set `REACT_APP_DISABLE_BACKEND=true` to prevent runtime errors.

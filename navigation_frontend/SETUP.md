# Navigation Frontend

## Quick Start
1. Create `.env` from `.env.example` and fill in values:
   - REACT_APP_GOOGLE_MAPS_API_KEY=<your_browser_key_with_Maps_JS_and_Places_enabled>
   - REACT_APP_BACKEND_URL (optional; defaults to http://localhost:3001)
   - REACT_APP_DISABLE_BACKEND (optional; `true` to use mock responses)

2. Install dependencies and run:
   npm install
   npm start

## Important: Environment variables
- CRA (create-react-app) reads env vars at build/start time. If you change `.env`, you MUST stop and restart `npm start` to pick up changes.
- The app uses `process.env.REACT_APP_GOOGLE_MAPS_API_KEY` at build-time to inject the Google Maps loader script.
- If the key is missing, the Map shows a placeholder and Autocomplete is disabled.

## Google Maps API setup
- Enable: Maps JavaScript API and Places API for your project.
- Use a Browser API key.
- If using HTTP referrer restrictions, add your dev/preview origins (e.g. http://localhost:3000 and any cloud preview URL) to the allowed list.
- Common errors:
  - MissingKeyMapError: no/invalid key
  - RefererNotAllowedMapError: referrer restriction blocking this origin
  - ApiNotActivatedMapError: API not enabled

## Notes
- If you do not have a Google Maps API key, the map area shows a placeholder.
- If the backend is not running, set `REACT_APP_DISABLE_BACKEND=true` to prevent runtime errors.

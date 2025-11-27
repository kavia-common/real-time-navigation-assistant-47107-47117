import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMaps, getGoogleMapsApiKey } from "../lib/googleMaps";
import "./styles.css";

// PUBLIC_INTERFACE
export default function MapView({ center, polyline }) {
  /**
   * Displays a Google Map. If API fails to load, shows a graceful placeholder.
   * polyline is a string; for demo we render a simple marker at center.
   */
  const ref = useRef(null);
  const [mapsReady, setMapsReady] = useState(false);
  const [map, setMap] = useState(null);
  const [error, setError] = useState("");
  const [debugKey, setDebugKey] = useState("");

  const defaultCenter = center || { lat: 37.7749, lng: -122.4194 };
  const defaultZoom = 12;

  useEffect(() => {
    setDebugKey(getGoogleMapsApiKey() ? "(key present)" : "(no key detected at build)");
  }, []);

  useEffect(() => {
    let isMounted = true;
    loadGoogleMaps()
      .then((google) => {
        if (!isMounted || !ref.current || !google?.maps) return;
        const m = new google.maps.Map(ref.current, {
          center: defaultCenter,
          zoom: defaultZoom,
          disableDefaultUI: false,
        });
        if (defaultCenter) {
          new google.maps.Marker({ position: defaultCenter, map: m, title: "Center" });
        }
        setMap(m);
        setMapsReady(true);
      })
      .catch((e) => {
        console.error("[MapView] Failed to initialize map:", e);
        const message =
          (e && (e.message || e.toString())) ||
          "Map failed to load. Check API key, referrer restrictions, and whether Maps JavaScript API is enabled.";
        setError(message);
        setMapsReady(false);
      });
    return () => {
      isMounted = false;
    };
  }, [defaultCenter]);

  useEffect(() => {
    if (!map || !mapsReady) return;
    // TODO: Decode and draw polyline when using real data.
  }, [map, mapsReady, polyline]);

  if (!mapsReady) {
    return (
      <div className="map--placeholder" style={{ minHeight: 480 }}>
        <div className="map--placeholder-inner">
          <span role="img" aria-label="map">🗺️</span>
          <p>
            Map will appear here. Ensure REACT_APP_GOOGLE_MAPS_API_KEY is set {debugKey}.
          </p>
          <p style={{ fontSize: 12, opacity: 0.8 }}>
            If your key has HTTP referrer restrictions, add this preview host and port (e.g. http://localhost:3000 or the CI preview URL).
          </p>
          {error ? <p style={{ color: "#991b1b" }}>{error}</p> : null}
        </div>
      </div>
    );
  }

  // Ensure height is explicit so the map is visible regardless of parent flex behavior
  return <div ref={ref} className="map" style={{ minHeight: 480, height: 480 }} />;
}

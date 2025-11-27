import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../lib/googleMaps";
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

  useEffect(() => {
    let isMounted = true;
    loadGoogleMaps()
      .then((google) => {
        if (!isMounted || !ref.current) return;
        const m = new google.maps.Map(ref.current, {
          center: center || { lat: 37.7749, lng: -122.4194 },
          zoom: 12,
          disableDefaultUI: false,
        });
        if (center) {
          new google.maps.Marker({ position: center, map: m, title: "Center" });
        }
        setMap(m);
        setMapsReady(true);
      })
      .catch((e) => {
        console.error("[MapView] Failed to initialize map:", e);
        setError(
          "Map failed to load. Check API key, referrer restrictions, and whether Maps JavaScript API is enabled."
        );
        setMapsReady(false);
      });
    return () => {
      isMounted = false;
    };
  }, [center]);

  useEffect(() => {
    if (!map || !mapsReady) return;
    // TODO: Decode and draw polyline when using real data.
  }, [map, mapsReady, polyline]);

  if (!mapsReady) {
    return (
      <div className="map--placeholder" style={{ minHeight: 420 }}>
        <div className="map--placeholder-inner">
          <span role="img" aria-label="map">🗺️</span>
          <p>Map will appear here. Ensure REACT_APP_GOOGLE_MAPS_API_KEY is set.</p>
          {error ? <p style={{ color: "#991b1b" }}>{error}</p> : null}
        </div>
      </div>
    );
  }

  return <div ref={ref} className="map" style={{ minHeight: 420 }} />;
}

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

  useEffect(() => {
    let isMounted = true;
    loadGoogleMaps()
      .then((maps) => {
        if (!isMounted || !ref.current) return;
        const m = new maps.Map(ref.current, {
          center: center || { lat: 37.7749, lng: -122.4194 },
          zoom: 12,
          disableDefaultUI: false,
        });
        new maps.Marker({ position: center, map: m, title: "Center" });
        setMap(m);
        setMapsReady(true);
      })
      .catch(() => {
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
      <div className="map--placeholder">
        <div className="map--placeholder-inner">
          <span role="img" aria-label="map">🗺️</span>
          <p>Map will appear here. Set REACT_APP_GOOGLE_MAPS_API_KEY to enable.</p>
        </div>
      </div>
    );
  }

  return <div ref={ref} className="map" />;
}

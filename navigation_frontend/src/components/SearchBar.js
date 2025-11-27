import React, { useEffect, useRef } from "react";
import { loadGoogleMaps } from "../lib/googleMaps";
import "./styles.css";

// PUBLIC_INTERFACE
export default function SearchBar({ origin, destination, onChange, onSearch, loading }) {
  /**
   * Search bar with origin/destination inputs and a Go button.
   * Uses Google Places Autocomplete when Maps API is available.
   */
  const originRef = useRef(null);
  const destRef = useRef(null);

  useEffect(() => {
    let originAutocomplete, destAutocomplete;
    loadGoogleMaps().then((maps) => {
      if (originRef.current) {
        originAutocomplete = new maps.places.Autocomplete(originRef.current, {
          fields: ["formatted_address", "geometry", "name"],
        });
        originAutocomplete.addListener("place_changed", () => {
          const place = originAutocomplete.getPlace();
          onChange({
            origin: place.formatted_address || place.name || originRef.current.value,
            destination,
          });
        });
      }
      if (destRef.current) {
        destAutocomplete = new maps.places.Autocomplete(destRef.current, {
          fields: ["formatted_address", "geometry", "name"],
        });
        destAutocomplete.addListener("place_changed", () => {
          const place = destAutocomplete.getPlace();
          onChange({
            origin,
            destination: place.formatted_address || place.name || destRef.current.value,
          });
        });
      }
    }).catch(() => {
      // If Google Maps not loaded (no key), silently skip autocomplete
    });

    return () => {
      // Cleanup listeners are internal to Google API; no-op here
    };
  }, [origin, destination, onChange]);

  return (
    <div className="search">
      <div className="search__inputs">
        <input
          ref={originRef}
          value={origin}
          onChange={(e) => onChange({ origin: e.target.value, destination })}
          placeholder="Origin"
          className="input"
          aria-label="Origin"
        />
        <input
          ref={destRef}
          value={destination}
          onChange={(e) => onChange({ origin, destination: e.target.value })}
          placeholder="Destination"
          className="input"
          aria-label="Destination"
        />
      </div>
      <button className="btn" onClick={onSearch} disabled={loading || !origin || !destination}>
        {loading ? "Finding..." : "Go"}
      </button>
    </div>
  );
}

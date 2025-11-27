import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import "./components/styles.css";
import { applyTheme, OceanTheme } from "./theme";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import RouteDetails from "./components/RouteDetails";
import { apiGet, apiPost } from "./api/client";

// PUBLIC_INTERFACE
function App() {
  /** Main app layout: top nav, sidebar, search bar, and map. */
  const [user, setUser] = useState(null);
  const [originDest, setOriginDest] = useState({ origin: "", destination: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    applyTheme(OceanTheme);
  }, []);

  useEffect(() => {
    let isMounted = true;
    apiGet("/api/user").then((res) => {
      if (!isMounted) return;
      if (res.ok) setUser(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const center = useMemo(() => {
    // Simple default center; could be geolocation in future.
    return { lat: 37.7749, lng: -122.4194 };
  }, []);

  const onSearch = async () => {
    setLoading(true);
    setErr("");
    setResult(null);
    const res = await apiPost("/api/routes", {
      origin: originDest.origin,
      destination: originDest.destination,
    });
    setLoading(false);
    if (!res.ok) {
      setErr(res.error || "Failed to compute route");
    } else {
      setResult(res.data);
    }
  };

  return (
    <div className="layout">
      <div className="layout__nav">
        <NavBar user={user} />
      </div>
      <div className="layout__sidebar">
        <RouteDetails result={result} loading={loading} error={err} />
      </div>
      <main className="layout__main">
        <SearchBar
          origin={originDest.origin}
          destination={originDest.destination}
          onChange={setOriginDest}
          onSearch={onSearch}
          loading={loading}
        />
        {/* Diagnostic hint: if env wasn't picked up, MapView placeholder will show "(no key detected at build)". */}
        <MapView center={center} polyline={result?.polyline} />
      </main>
    </div>
  );
}

export default App;

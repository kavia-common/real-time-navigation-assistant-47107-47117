import React from "react";
import "./styles.css";

// PUBLIC_INTERFACE
export default function RouteDetails({ result, loading, error }) {
  /** Sidebar with route distance/duration and step list. */
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h3>Route Details</h3>
        {loading && <span className="chip chip--loading">Loading...</span>}
        {error && <span className="chip chip--error">{error}</span>}
      </div>
      {!result && !loading && !error && (
        <div className="empty">
          <p>Enter an origin and destination to see directions.</p>
        </div>
      )}
      {result && (
        <div className="route-summary">
          <div className="stat">
            <div className="stat__label">Distance</div>
            <div className="stat__value">{result.distanceText}</div>
          </div>
          <div className="stat">
            <div className="stat__label">Duration</div>
            <div className="stat__value">{result.durationText}</div>
          </div>
        </div>
      )}
      {result?.steps?.length ? (
        <ul className="steps">
          {result.steps.map((s, idx) => (
            <li key={idx} className="step">
              <div className="step__bullet">{idx + 1}</div>
              <div className="step__content">
                <div className="step__instruction">{s.instruction}</div>
                <div className="step__meta">
                  <span>{s.distanceText}</span>
                  <span>•</span>
                  <span>{s.durationText}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}

const BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const FEATURE_DISABLE_BACKEND =
  (process.env.REACT_APP_DISABLE_BACKEND || "false").toLowerCase() === "true";

// PUBLIC_INTERFACE
export async function apiGet(path) {
  /** Perform GET request to backend, with graceful fallback if disabled. */
  if (FEATURE_DISABLE_BACKEND) {
    return { ok: true, data: mockData(path) };
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) {
      const err = await safeJson(res);
      throw new Error(err?.error || `GET ${path} failed (${res.status})`);
    }
    return { ok: true, data: await res.json() };
  } catch (e) {
    return { ok: false, error: e.message || "Network error" };
  }
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  /** Perform POST request to backend, with graceful fallback if disabled. */
  if (FEATURE_DISABLE_BACKEND) {
    return { ok: true, data: mockData(path, body) };
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body || {}),
    });
    if (!res.ok) {
      const err = await safeJson(res);
      throw new Error(err?.error || `POST ${path} failed (${res.status})`);
    }
    return { ok: true, data: await res.json() };
  } catch (e) {
    return { ok: false, error: e.message || "Network error" };
  }
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function mockData(path, body) {
  if (path === "/api/user") {
    return {
      id: "demo-user",
      name: "Ocean Navigator",
      email: "ocean.navigator@example.com",
      preferences: { units: "metric" },
    };
  }
  if (path === "/api/history") {
    return { items: [] };
  }
  if (path === "/api/routes") {
    return {
      polyline: "mock_polyline",
      distanceText: "5.2 km",
      durationText: "13 mins",
      steps: [
        { instruction: `Start at ${body?.origin || "Origin"}`, distanceText: "0.5 km", durationText: "2 mins" },
        { instruction: "Head north", distanceText: "2.0 km", durationText: "5 mins" },
        { instruction: "Turn right onto Ocean Ave", distanceText: "1.5 km", durationText: "4 mins" },
        { instruction: `Arrive at ${body?.destination || "Destination"}`, distanceText: "1.2 km", durationText: "2 mins" },
      ],
    };
  }
  return {};
}

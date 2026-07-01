const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("moodify_token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getRecommendations(mood) {
  const res = await fetch(
    `${API_URL}/api/spotify/recommendations?mood=${encodeURIComponent(mood)}`,
    { headers: authHeaders() }
  );
  if (res.status === 401) throw new Error("Please login to continue");
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}

export async function saveMoodHistory(mood, playlistId = "", playlistName = "") {
  await fetch(`${API_URL}/api/mood-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ mood, playlistId, playlistName }),
  });
}

export async function getMoodHistory() {
  const res = await fetch(`${API_URL}/api/mood-history`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch mood history");
  return res.json();
}

export async function resendVerification(email) {
  const res = await fetch(`${API_URL}/api/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to resend verification email");
  return data;
}

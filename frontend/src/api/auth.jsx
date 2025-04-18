// src/api/auth.js

const API_BASE = "http://localhost:8000/users/api";

export async function login(username, password) {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  return await response.json();
}

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE}/me/`, {
    credentials: "include"
  });

  return await response.json();
}

export async function logout() {
  const response = await fetch(`${API_BASE}/logout/`, {
    method: "POST",
    credentials: "include"
  });

  return await response.json();
}
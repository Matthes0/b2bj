// src/api/auth.js

const API_BASE = "http://localhost:8000/api/users";

// export async function login(username, password) {
//   const response = await fetch(`${API_BASE}/login/`, {
//     method: "POST",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password })
//   });

//   return await response.json();
// }

export async function login(username, password) {
  // 🔑 najpierw wyślij GET, żeby ustawić cookie csrf
  await fetchCSRFToken();

  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(), // teraz ten token będzie dostępny
    },
    body: JSON.stringify({ username, password }),
  });

  return await response.json();
}


// export async function getCurrentUser() {
//   const response = await fetch(`${API_BASE}/me/`, {
//     credentials: "include"
//   });

//   return await response.json();
// }

export async function fetchCSRFToken() {
  const res = await fetch(`${API_BASE}/login/`, {
    method: "GET",
    credentials: "include",
  });
}


export async function getCurrentUser() {
  const response = await fetch(`${API_BASE}/me/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-CSRFToken": getCSRFToken(),
    },
  });

  if (response.status === 401) {
    return null;
  }

  return await response.json();
}


export async function logout() {
  const response = await fetch(`${API_BASE}/logout/`, {
    method: "POST",
    credentials: "include"
  });

  return await response.json();
}

function getCSRFToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

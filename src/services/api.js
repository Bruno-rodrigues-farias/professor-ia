const API_URL = "http://localhost:8080";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();

    console.error("Resposta inválida:", text);

    throw new Error(
      "Backend não respondeu JSON. Verifique se o servidor Node está rodando."
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro na API.");
  }

  return data;
}

export async function login(email, password) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  setToken(data.token);

  return data;
}

export async function register(name, email, password) {
  const data = await apiFetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  setToken(data.token);

  return data;
}
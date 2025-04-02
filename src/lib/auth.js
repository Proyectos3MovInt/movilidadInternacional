'use server'

import { cookies } from 'next/headers'

// Envia una petición POST a la API, devuelve el código de respuesta y guarda el token JWT como cookie si todo ha ido bien

export async function login(email, password) {

  const cookieStore = await cookies();

  const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const response_json = await response.json();
  console.log(response_json);

  if (response.status == 200) {
    cookieStore.set('token', response_json.token, { httpOnly: true });
  }

  return response.status;
}

export async function register(email, password, name, surname) {

  const cookieStore = await cookies();

  const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, surname }),
  });
  const response_json = await response.json();
  console.log(response_json);

  if (response.status == 200) {
    cookieStore.set('token', response_json.token, { httpOnly: true });
  }

  return response.status;
}
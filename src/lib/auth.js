'use server'

import { cookies } from 'next/headers'

export async function login(email, password) {
  const cookieStore = await cookies();

  try {
    const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const response_json = await response.json();
    console.log(response_json);

    if (response.status === 200) {
      cookieStore.set('token', response_json.token, { httpOnly: true });
    }

    return response.status;
  } catch (error) {
    console.error("Error al hacer login:", error);
    return 500;
  }
}

export async function register(email, password, name, surname) {
  const cookieStore = await cookies();

  try {
    const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, surname }),
    });

    const response_json = await response.json();
    console.log(response_json);

    if (response.status === 200 || response.status === 201) {
      cookieStore.set('token', response_json.token, { httpOnly: true });
    }

    return response.status;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return 500;
  }
}

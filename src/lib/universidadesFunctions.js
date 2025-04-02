'use server';

import { cookies } from 'next/headers';

export async function getUniversidades() {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token")?.value;
    
    if (!jwt_token) throw new Error("Token no encontrado");

    const response = await fetch(`https://amused-danya-hugobarea-b3e72b1a.koyeb.app/ESTO FALTA`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de las universidades");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getUniversidades:", error);
    return null;
  }
}

export async function getUniversidadDetails(universidadId) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token")?.value;
    
    if (!jwt_token) throw new Error("Token no encontrado");

    const response = await fetch(`https://tu-api-de-universidades.com/universidades/${universidadId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles de la universidad");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getUniversidadDetails:", error);
    return null;
  }
}

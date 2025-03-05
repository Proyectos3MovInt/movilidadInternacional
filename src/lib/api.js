"use client";

export async function getFormData() {
  try {
    // Obtener el token de las cookies del navegador
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    
    if (!token) {
      console.error("No se encontró un token JWT");
      return null;
    }

    const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/form", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del formulario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getFormData:", error);
    return null;
  }
}

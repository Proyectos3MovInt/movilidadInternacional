'use server';

import { cookies } from "next/headers"

export async function getForm() {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;


    const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/form", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
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

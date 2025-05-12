'use server';

import { cookies } from 'next/headers';

export async function getUniversidades() {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token")?.value;
    
    if (!jwt_token) throw new Error("Token no encontrado");

    const response = await fetch(`https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/`, {
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

export async function crearUniversidad(nuevaUniversidad) {
  try {
    const cookieStore = await cookies(); // ✅ Await añadido
    const jwt_token = cookieStore.get("token")?.value;

    if (!jwt_token) throw new Error("Token no encontrado");

    const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaUniversidad),
    });

    if (!response.ok) {
      const text = await response.text(); // 👀 Ayuda a debuguear errores
      console.error("❌ Respuesta del servidor:", text);
      throw new Error("Error al crear universidad");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error al crear universidad:", error);
    return null;
  }
}

export async function subirArchivoUniversidad(formData) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token")?.value;

    if (!jwt_token) throw new Error("Token no encontrado");


    const universidadId = "680a83980642eef62e447dde";

    if (!formData.has("file")) {
      throw new Error("El campo 'file' es obligatorio");
    }

    formData.append("universidad", universidadId);

    const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/fileUniversity", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al subir archivo:", errorText);
      throw new Error(`Error en la respuesta del servidor: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al subir archivo:", error);
    throw error;
  }
}
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

export async function getUniversidadesArchivadas() {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token")?.value;

    if (!jwt_token) throw new Error("Token no encontrado");

    const response = await fetch(`https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/archived`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.log(response);
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

    const response = await fetch(`https://amused-danya-hugobarea-b3e72b1a.koyeb.com/university/${universidadId}`, {
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
    const cookieStore = await cookies();
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
      const text = await response.text();
      console.error("Respuesta del servidor:", text);
      throw new Error("Error al crear universidad");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear universidad:", error);
    return null;
  }
}

export async function subirArchivoUniversidad(formData) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token")?.value;

    if (!jwt_token) throw new Error("Token no encontrado");

    const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/fileUniversity/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
      },
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Respuesta del servidor:", text);
      throw new Error("Error al crear universidad");
    }

    return response.ok;
  } catch (error) {
    console.error("Error al crear universidad:", error);
    return null;
  }
}

export async function archivarUniversidad(id) {
  const cookieStore = cookies();
  const jwt_token = cookieStore.get("token")?.value;

  const response = await fetch(
    `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/archive/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al archivar universidad:", errorText);
    throw new Error("Error al archivar universidad");
  }

  return true;
}

export async function desarchivarUniversidad(id) {
  const cookieStore = cookies();
  const jwt_token = cookieStore.get("token")?.value;

  const response = await fetch(
    `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/restore/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al archivar universidad:", errorText);
    throw new Error("Error al archivar universidad");
  }

  return true;
}

export async function activarUniversidad(id) {
  const cookieStore = cookies();
  const jwt_token = cookieStore.get("token")?.value;

  const response = await fetch(
    `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/activate/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al activar universidad:", errorText);
    throw new Error("Error al activar universidad");
  }

  return true;
}


export async function editarUniversidad(id, data) {
  try {
    const cookieStore = cookies();
    const jwt_token = cookieStore.get("token")?.value;

    if (!jwt_token) throw new Error("Token no encontrado");

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al editar universidad:", errorText);
      throw new Error("Error al editar universidad");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en editarUniversidad:", error);
    return null;
  }
}

export async function getUniversityAnotaciones(id) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/university/anotaciones/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    if (!response.ok) {
      return "";
    }
   

    return await response.json();

  } catch (error) {
    console.error("Error al cambiar estado:", error);
    throw error;
  }
}

export async function addUniversityAnotaciones(id, anotacion) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/university/anotaciones/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ anotacionesAdmin: anotacion })
      }
    );
    if (!response.ok) {
      return "";
    }


    return await response.json();

  } catch (error) {
    console.error("Error al cambiar estado:", error);
    throw error;
  }
}
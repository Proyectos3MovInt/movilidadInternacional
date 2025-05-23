"use server";

import { cookies } from "next/headers";

export async function getStudentsTable(studentType) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/${studentType}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log("Error en la respuesta:", response);
      throw new Error("Error al obtener los datos de la tabla");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getFormData:", error);
    return null;
  }
}

export async function getAdminName() {
  const cookieStore = cookies();
  const jwt_token = cookieStore.get("token")?.value;

  if (!jwt_token) return "Nombre del Admin";

  try {
    const base64Payload = jwt_token.split(".")[1];
    const decodedPayload = JSON.parse(atob(base64Payload));

    if (decodedPayload.name && decodedPayload.surname) {
      return `${decodedPayload.name} ${decodedPayload.surname}`;
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
  }

  return "Nombre del Admin";
}

export async function getStudentData(id) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/student/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los datos del estudiante");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getStudentData:", error);
    return null;
  }
}

export async function getUniversityById(id) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    console.log(id);

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los datos de la universidad");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getUniversityById:", error);
    return null;
  }
}

export async function getArchivedUniversityById(id) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    console.log(id);

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/archived/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los datos de la universidad");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getUniversityById:", error);
    return null;
  }
}

export async function getUniversityStudents(id) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    console.log(id);

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/${id}/alumnos`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los alumnos de la universidad");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getUniversityStudents:", error);
    return null;
  }
}

export async function getUniversityFiles(id) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/university/${id}/archivos`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los archivos de la universidad");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getUniversityFiles:", error);
    return null;
  }
}

// Para el calendario
export async function getCalendarEvents() {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/calendar/events`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getCalendarEvents:", error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
}

export async function createCalendarEvent(event) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/calendar/event`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getCalendarEvents:", error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
}

export async function exportToExcel(data) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/export`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();
    return blob;

  } catch (error) {
    console.error("Error al exportar el Excel:", error);
    throw error;
  }
}


export async function cambiarEstado(id, estado) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/cambiar-estado`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, processStatus: estado }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

  } catch (error) {
    console.error("Error al cambiar estado:", error);
    throw error;
  }
}

export async function getStudentAnotaciones(id) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/student/anotaciones/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return "";
    }
    console.log(response);

    return await response.json();

  } catch (error) {
    console.error("Error al cambiar estado:", error);
    throw error;
  }
}

export async function addStudentAnotaciones(id, anotacion) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    if (!jwt_token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/student/anotaciones/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ anotacionesAdmin: anotacion })
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
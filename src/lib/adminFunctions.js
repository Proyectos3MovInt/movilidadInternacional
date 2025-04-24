'use server';

import { cookies } from 'next/headers'

export async function getStudentsTable(studentType) {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    const response = await fetch(`https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/${studentType}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
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

    const response = await fetch(`https://amused-danya-hugobarea-b3e72b1a.koyeb.app/admin/student/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt_token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Error al obtener los datos del estudiante");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getStudentData:", error);
    return null;
  }
}

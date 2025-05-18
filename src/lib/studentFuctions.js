"use server";

import { cookies } from "next/headers";

export async function getStudentData() {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/student/student`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
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

export async function getUtadFiles() {
  try {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    const response = await fetch(
      `https://amused-danya-hugobarea-b3e72b1a.koyeb.app/fileUniversity/utad`,
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

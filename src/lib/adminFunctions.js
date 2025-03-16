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
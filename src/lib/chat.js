'use server'

import { cookies } from 'next/headers'

export async function getMessages(id) {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    try {
        const response = await fetch(`https://amused-danya-hugobarea-b3e72b1a.koyeb.app/chat?id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt_token}`
            }
        });
        console.log(response);

        const response_json = await response.json();
        console.log(response_json);
        return response_json;
    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        return 500;
    }
}

export async function sendMessageStudent(content) {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;

    try {
        const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/chat", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwt_token}`,
                "Content-Type": "application/json"
            },
            body: {
                "content" : content,
                "receiverId": null /* irrelevante ya que llega a todos los admins */
            }
        });

        console.log(response);

    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        return 500;
    }
}

export async function sendMessageAdmin(id, content) {
    const cookieStore = await cookies();
    const jwt_token = cookieStore.get("token").value;
    console.log(content);
    console.log(id);

    try {
        const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/chat", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwt_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content,
                receiverId: id
            })
        });

        console.log(response);

    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        return 500;
    }
}

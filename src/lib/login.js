'use server'

import { cookies } from 'next/headers'

export async function login(email, password) {

        const cookieStore = await cookies();

        const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const response_json = await response.json();
        console.log(response_json);
  
        if(response.status == 200) {
          cookieStore.set('jwt-token', response_json.token, { httpOnly: true });
        }
      
        return response.status;
}
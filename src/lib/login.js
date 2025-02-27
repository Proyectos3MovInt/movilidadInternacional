'use server'

export async function login(email, password) {
    try {
        const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.status === 200) {
          const result = await response.json(); 
          localStorage.setItem("jwt", result.token); // esto va a cookie, no a local storage
          alert("¡Inicio de sesión exitoso!");
          router.push("/form-outgoing"); // redirige al formulario de outgoing
        } else if (response.status === 404 || response.status === 401) {
          alert("Error: Credenciales incorrectas.");
        } else {
          alert("Ocurrió un problema. Inténtalo más tarde.");
        }
      } catch (err) {
        console.error("Error en la solicitud:", err);
        alert("Hubo un problema al iniciar sesión.");
      }
}
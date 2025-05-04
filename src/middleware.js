import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (token) {
    try {
      // Sacamos la parte del payload del token
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      
      // Si el rol es admin y no está ya en la ruta admin-dashboard, le redirige a /home.
      if (payload.role === "admin" && req.nextUrl.pathname !== "/home") {
        return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  // Rutas protegidas para usuarios no administradores
  const protectedRoutes = ["/dashboard", "/profile", "/form-outgoing", "/<RUTA QUE QUERAIS PONER>"];
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

// Configuración para aplicar el middleware solo en ciertas rutas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/form-outgoing/:path*",
    "/profile/:path*",
    "/<RUTA QUE QUERAIS PONER>/:path*"
  ],
};

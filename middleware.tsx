import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  console.log("Middleware ejecutándose en:", req.nextUrl.pathname);
  console.log("Token recibido:", token);

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ["/dashboard", "/profile", "/registro"];

  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      console.log("No token encontrado. Redirigiendo a la página principal...");
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

// Configuración para aplicar el middleware solo en ciertas rutas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/registro", "/registro/:path*"],
};
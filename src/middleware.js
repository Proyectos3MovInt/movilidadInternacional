import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  
  const protectedRoutes = ["/dashboard", "/profile", "/form-outgoing", "/<RUTA QUE QUERAIS PONER>"];

  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    console.log("aqui");
    if (!token) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

// Configuración para aplicar el middleware solo en ciertas rutas
export const config = {
  matcher: ["/dashboard/:path*", "/form-outgoing/:path*", "/profile/:path*", "/<RUTA QUE QUERAIS PONER>/:path*"],
};
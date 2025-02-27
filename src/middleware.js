import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("jwt")?.value;
  
  const protectedRoutes = ["/dashboard", "/profile", "/<RUTA QUE QUERAIS PONER>"];

  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

// Configuración para aplicar el middleware solo en ciertas rutas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/<RUTA QUE QUERAIS PONER>/:path*"],
};
import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (token) {
    try {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      const role = payload.role;
      const pathname = req.nextUrl.pathname;

      // Rutas permitidas para cada rol
      const alumnoRoutes = [
        "/form-incoming",
        "/form-outgoing",
        "/alumno-alumno",
        "/alumnos-incoming"
      ];

      const adminRoutes = [
        "/home",
        "/admin-alumno",
        "/admin-calendar",
        "/admin-dashboard",
        "/admin-universidad",
        "/admin-universidad-archivada",
        "/universidades",
        "/universidades-archivadas",
        "/alumnos-incoming" 
      ];

      if (role === "admin") {
        if (!adminRoutes.some(route => pathname.startsWith(route))) {
          return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
        }
      } else {
        if (!alumnoRoutes.some(route => pathname.startsWith(route))) {
          return NextResponse.redirect(new URL("/form-incoming", req.nextUrl.origin));
        }
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  } else {
    // Sin token → redirigir al login
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/form-incoming/:path*",
    "/form-outgoing/:path*",
    "/alumno-alumno/:path*",
    "/alumnos-incoming/:path*",
    "/home/:path*",
    "/admin-alumno/:path*",
    "/admin-calendar/:path*",
    "/admin-dashboard/:path*",
    "/admin-universidad/:path*",
    "/admin-universidad-archivada/:path*",
    "/universidades/:path*",
    "/universidades-archivadas/:path*"
  ]
};

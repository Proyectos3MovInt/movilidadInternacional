# Proyecto de Movilidad Internacional

Este proyecto basado en **Next.js** facilita la gestión y organización de programas de movilidad internacional para estudiantes y administradores. Incluye autenticación por roles, formularios y un panel de administración.

## Empezando

Primero, instala las dependencias y ejecuta el servidor de desarrollo:

```bash
npm install
npm run dev
# o
yarn
yarn dev
# o
pnpm install
pnpm dev
# o
bun install
bun dev
```

Abre <http://localhost:3000> en tu navegador para ver la aplicación en funcionamiento.

## Requisitos Previos

- [Node.js](https://nodejs.org/) 18 o superior
- Un gestor de paquetes (npm, yarn, pnpm o bun)

### Autenticación por roles

- Inicio de sesión y registro con token JWT.
- Protección de rutas según el rol del usuario:
  - **Alumnos:** acceso solo a los formularios y vistas de alumno.
  - **Administradores:** acceso a los paneles de administración y gestión de universidades.

### Middleware de protección de rutas

Se ha configurado el middleware para interceptar todas las peticiones y permitir la navegación únicamente a las rutas correspondientes al rol del usuario.

### Estructura de rutas

**Alumnos**

- `/form-incoming`
- `/form-outgoing`
- `/alumno-alumno`
- `/alumnos-incoming`

**Administradores**

- `/home`
- `/admin-alumno`
- `/admin-calendar`
- `/admin-dashboard`
- `/admin-universidad`
- `/admin-universidad-archivada`
- `/universidades`
- `/universidades-archivadas`
- `/alumnos-incoming`

### Estilos

- Diseño con **Tailwind CSS** para una interfaz clara y adaptable.

### Componentes

- Componentes reutilizables en la carpeta `components` para mejorar la mantenibilidad del código.

## Despliegue

La aplicación se puede desplegar fácilmente en [Vercel](https://vercel.com/). Consulta la [guía de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Aprende más sobre Next.js

- [Documentación oficial](https://nextjs.org/docs)
- [Tutorial interactivo](https://nextjs.org/learn)
- [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js)
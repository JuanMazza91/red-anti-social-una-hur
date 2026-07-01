# 🍌 Red Anti Social

# Descripción del proyecto

Red Anti Social es una aplicación web desarrollada para la materia Construcción de Interfaces de Usuario (CIU) de la Universidad Nacional de Hurlingham.

La aplicación simula una red social donde los usuarios pueden visualizar publicaciones, interactuar mediante comentarios y reaccionar a los contenidos utilizando el sistema de "Bananos 🍌".

La interfaz fue desarrollada utilizando React y TypeScript, consumiendo una API REST para la gestión de publicaciones, comentarios y usuarios.

---

# API utilizada en el proyecto

https://github.com/JuanMazza91/red-anti-social-api


---

## Integrantes

- @gonzaloherlein
- @JuanMazza91
- @MateoHortas
- @sofiaagomez
- @ThomiVai

---

# Funcionalidades principales

## Usuarios

- Registro de usuario
- Inicio de sesión
- Persistencia de sesión
- Visualización de perfil
- Protección de rutas privadas

## Publicaciones

- Listado de publicaciones
- Visualización de detalle de publicación
- Creación de publicaciones
- Eliminación de publicaciones
- Visualización de imágenes asociadas

## Comentarios

- Visualización de comentarios por publicación
- Creación de comentarios
- Eliminación de comentarios

## Reacciones

- Sistema de "Bananos 🍌"
- Contador de reacciones por publicación

---

# Tecnologías utilizadas

## Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- Context API
- Bootstrap
- React Bootstrap
- Bootstrap Icons
- React Icons
- SweetAlert2

---

# Estructura del proyecto

```text
src
│
├── api
│   ├── CommentApi.ts
│   ├── PostApi.ts
│   └── TagApi.ts
│
├── assets
│
├── components
│   ├── AsideNavCard.tsx
│   ├── AsideNoticias.tsx
│   ├── Avatar.tsx
│   ├── CommentItem.tsx
│   ├── CommentSection.tsx
│   ├── DetailPostCard.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ModalPublication.tsx
│   ├── Navbar.tsx
│   ├── PerfilLogout.tsx
│   ├── PostCard.tsx
│   ├── PostsHome.tsx
│   ├── Sidebar.tsx
│   └── TagList.tsx
│
├── context
│   └── LoginContext.tsx
│
├── hooks
│   ├── useRelativeTime.ts
│   └── useUserPosts.ts
│
├── pages
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Perfil.tsx
│   ├── PostDetail.tsx
│   └── Register.tsx
│
├── routes
│   └── ProtectedRoute.tsx
│
├── services
│   └── PostService.ts
│
├── style
│
├── types
│   ├── Comment.ts
│   ├── Post.ts
│   ├── Tag.ts
│   ├── User.ts
│   └── Index.ts
│
├── App.tsx
└── main.tsx
```

---

# Instrucciones para correr el proyecto en local

## Requisitos previos

Tener instalado:

- Node.js 18 o superior
- npm

Verificar instalación:

```bash
node -v
npm -v
```

---

## Clonar el repositorio

```bash
git clone [<URL_DEL_REPOSITORIO>](https://github.com/JuanMazza91/red-anti-social-una-hur.git)
```

Ingresar al proyecto:

```bash
cd red-anti-social
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar el proyecto

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

---

## Generar build de producción

```bash
npm run build
```

---

## Previsualizar build

```bash
npm run preview
```

---

# API utilizada

La aplicación consume una API REST ejecutándose localmente en:

```text
http://localhost:3000
```

---

## Endpoints de publicaciones

### Obtener publicaciones

```http
GET /posts
```

### Obtener una publicación

```http
GET /posts/:id
```

### Crear publicación

```http
POST /posts
```

### Eliminar publicación

```http
DELETE /posts/:id
```

### Obtener imágenes de una publicación

```http
GET /posts/:id/imagenes
```

### Dar banano a una publicación

```http
PUT /posts/:id/banano
```

---

## Endpoints de comentarios

### Obtener comentarios de una publicación

```http
GET /posts/:id/comentarios
```

### Crear comentario

```http
POST /comentarios
```

### Eliminar comentario

```http
DELETE /comentarios/:id
```

---

## Construcción de Interfaces de Usuario (CIU)

**Año:** 2026

**Universidad Nacional de Hurlingham (UNAHUR)**

# Licencia

Proyecto desarrollado con fines exclusivamente académicos para la Universidad Nacional de Hurlingham (UNAHUR).

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

- [@gonzaloherlein](https://github.com/gonzaloherlein)
- [@JuanMazza91](https://github.com/JuanMazza91)
- [@MateoHortas](https://github.com/MateoHortas)
- [@sofiaagomez](https://github.com/sofiaagomez)
- [@ThomiVai](https://github.com/ThomiVai)

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
git clone https://github.com/JuanMazza91/red-anti-social-una-hur.git
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

## Endpoints de Publicaciones

| Método | Endpoint | Descripción |
|----------|----------|----------|
| GET | `/posts` | Obtiene todas las publicaciones |
| GET | `/posts/:id` | Obtiene una publicación específica |
| POST | `/posts` | Crea una nueva publicación |
| DELETE | `/posts/:id` | Elimina una publicación |
| GET | `/posts/:id/imagenes` | Obtiene las imágenes asociadas a una publicación |
| PUT | `/posts/:id/banano` | Agrega una reacción (🍌) a una publicación |

---

## Endpoints de Comentarios

| Método | Endpoint | Descripción |
|----------|----------|----------|
| GET | `/posts/:id/comentarios` | Obtiene los comentarios de una publicación |
| POST | `/comentarios` | Crea un nuevo comentario |
| DELETE | `/comentarios/:id` | Elimina un comentario |

---

## Endpoints de Etiquetas (Tags)

| Método | Endpoint | Descripción |
|----------|----------|----------|
| GET | `/tags` | Obtiene todas las etiquetas disponibles |

---

## Construcción de Interfaces de Usuario (CIU)

**Año:** 2026

**Universidad Nacional de Hurlingham (UNAHUR)**

# Licencia

Proyecto desarrollado con fines exclusivamente académicos para la Universidad Nacional de Hurlingham (UNAHUR).

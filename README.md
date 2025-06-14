# Frontend CEDENORTE

Este es el frontend para el sistema de gestión de una aplicación web que permite la gestión de ventas, usuarios y productos.

## Características

- **Sistema de autenticación**: Login con diferentes roles (administrador y usuario)
- **Panel de administración**: Funcionalidades exclusivas para administradores
- **Panel de usuario**: Interfaz adaptada para vendedores
- **Registro de ventas**: Interfaz para registrar nuevas ventas
- **API REST**: Comunicación con el backend mediante API REST

## Estructura del proyecto

```
frontend-cedenorte/
├── css/               # Estilos CSS
├── html/              # Páginas HTML
│   ├── admin/         # Páginas del panel de administración
│   └── user/          # Páginas del panel de usuario
├── js/                # Scripts JavaScript
│   ├── admin/         # Scripts para el panel de administración
│   └── user/          # Scripts para el panel de usuario
└── index.html         # Página de inicio (login)
```

## Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, etc.)
- Conexión a internet para cargar las dependencias CDN
- Backend API en ejecución (por defecto en http://127.0.0.1:8000)

## Uso

1. Clona este repositorio
2. Abre el archivo `index.html` en tu navegador o configura un servidor web local
3. Inicia sesión con tus credenciales
4. Dependiendo de tu rol, serás redirigido al panel correspondiente

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Choices.js para selectores mejorados
- Fetch API para comunicación con el backend

## Desarrollo

Para contribuir al desarrollo:

1. Clona este repositorio
2. Realiza tus cambios
3. Prueba tus cambios en un entorno local
4. Envía un pull request con tus modificaciones

## Seguridad

El sistema utiliza JWT (JSON Web Tokens) para la autenticación y autorización de usuarios.

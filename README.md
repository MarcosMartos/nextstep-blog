# NextStep - Blog de Tecnología

Es un blog de artículos sobre tecnología, gestión de proyectos, técnicas de organización y productividad, negocios y mucho más. Su función es informar y compartir conocimientos para emprendedores, estudiantes y personas curiosas que buscan desarrollar sus propios proyectos.

Este proyecto está desarrollado con **React** en **Vite** para el frontend y **Express.js** con **Prisma** para el backend. El blog permite a los administradores crear, editar y eliminar publicaciones, mientras que los usuarios pueden navegar y leer.


## 📸 Capturas de pantalla

### Página de bienvenida

![](https://res.cloudinary.com/df4ghpsiz/image/upload/v1744412403/home_nnpa0q.png)

### Página de publicaciones

![](https://res.cloudinary.com/df4ghpsiz/image/upload/v1744412412/pagepost_fvdrtn.png)

### Página de detalle de una publicación

![](https://res.cloudinary.com/df4ghpsiz/image/upload/v1744412419/post_jtawpn.png)


## 🌐 Demo

👉 [nextstep-blog-marcosmartos04.netlify.app](https://nextstep-blog-marcosmartos04.netlify.app/)


## 📋 Características

- ✍️ CRUD de publicaciones (crear, leer, actualizar, eliminar)
- 🔐 Roles de usuario (admin y lector)
- 🔎 Búsqueda de publicaciones
- 💅 Diseño responsive y profesional con Material UI
- ⚡ Despliegue del frontend en Netlify y backend en Railway


## 👥 Roles de usuario

- **Administrador**:
    - Crear publicaciones
    - Editar publicaciones existentes
    - Eliminar publicaciones
- **Usuario**:
    - Ver y leer publicaciones
    - Usar el buscador de artículos


## 🧰 Tecnologías utilizadas

### Frontend

- ⚛️ React
- ⚡ Vite
- 🎨 Material UI

### Backend

- 🌐 Express.js
- 🔄 Prisma ORM
- 🐘 PostgreSQL
- 🛡️ Autenticación con JWT


## 🧪 Cómo iniciar el proyecto localmente

### Clonar el repositorio

```bash
git clone <https://github.com/MarcosMartos/nextstep-blog.git>
cd nextstep-blog

```

### Configurar el backend

```bash
cd backend
npm install

```

Crear un archivo `.env` con las variables necesarias:

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nextstep
JWT_SECRET=tu_clave_secreta
FRONTEND_URL=http://localhost:5173

```

Migrar la base de datos con Prisma:

```bash
npx prisma migrate dev --name init

```

Iniciar el servidor backend:

```bash
npm run dev

```

### Configurar el frontend

```bash
cd ../frontend
npm install
npm run dev

```


## ✨ Próximas mejoras

- Registro e inicio de sesión
- Edición de perfil de usuario
- Paginación de publicaciones
- Comentarios y reacciones
- SEO optimizado


## 📦 Estado del proyecto

✅ Versión demo finalizada

🔧 En desarrollo: nuevas funciones y mejoras


## 🤝 Contribuciones

Las contribuciones son bienvenidas. Abrí un *issue* o enviá un *pull request*.


## 📄 Licencia

Este proyecto está bajo la licencia [MIT](https://www.notion.so/LICENSE).


## 📬 Contacto

Podés encontrarme en [LinkedIn](https://www.linkedin.com/in/marcos-martos-080305239/) o visitar mi [porfolio](https://marcosmartos-desarrollador-fullstack.netlify.app/).

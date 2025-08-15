# 🏆 Club Manager App - Frontend

## 📋 Descripción General

Aplicación frontend moderna para la gestión de clubs deportivos, construida con **Next.js 14**, **TypeScript**, **Tailwind CSS** y **shadcn/ui**. Proporciona una interfaz intuitiva y responsive para administrar todos los aspectos de un club deportivo.

## 🚀 Configuración Rápida

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env.local` en la raíz:

```env
# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 3. Iniciar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

## 🏗️ Arquitectura del Proyecto

### **Stack Tecnológico**

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **Componentes**: shadcn/ui + Radix UI
- **Estado**: React Context + Hooks
- **Autenticación**: JWT con Context API
- **Formularios**: React Hook Form + Zod
- **Internacionalización**: i18n con next-intl

### **Estructura de Directorios**

```
club-manager-app/
├── app/                    # App Router (Next.js 14)
│   ├── (dashboard)/        # Rutas protegidas del dashboard
│   │   ├── activities/     # Gestión de actividades
│   │   ├── clubs/          # Gestión de clubs
│   │   ├── home/           # Dashboard principal
│   │   ├── members/        # Gestión de miembros
│   │   ├── payments/       # Gestión de pagos
│   │   ├── permissions/    # Gestión de permisos
│   │   ├── properties/     # Gestión de propiedades
│   │   ├── roles/          # Gestión de roles
│   │   ├── sponsors/       # Gestión de sponsors
│   │   ├── users/          # Gestión de usuarios
│   │   └── layout.tsx      # Layout del dashboard
│   ├── api/                # API routes de Next.js
│   │   ├── auth/           # Endpoints de autenticación
│   │   ├── activities/     # Proxy a backend
│   │   ├── clubs/          # Proxy a backend
│   │   └── ...             # Otros endpoints
│   ├── login/              # Página de login
│   ├── register/           # Página de registro
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página principal
├── components/              # Componentes reutilizables
│   ├── auth/               # Componentes de autenticación
│   ├── creative/            # Componentes de diseño creativo
│   ├── ui/                  # Componentes de UI base
│   └── theme-provider.tsx   # Proveedor de tema
├── contexts/                # Contextos de React
│   ├── AuthContext.tsx      # Contexto de autenticación
│   └── LanguageContext.tsx  # Contexto de idioma
├── hooks/                   # Hooks personalizados
├── lib/                     # Utilidades y configuración
├── styles/                  # Estilos adicionales
└── public/                  # Archivos estáticos
```

## 🔐 Sistema de Autenticación

### **Características**

- **JWT Authentication**: Tokens JWT para autenticación
- **Protected Routes**: Rutas protegidas automáticamente
- **Auto-refresh**: Renovación automática de tokens
- **Role-based Access**: Control de acceso basado en roles
- **Session Management**: Gestión de sesiones persistentes

### **Flujo de Autenticación**

1. **Login**: Usuario ingresa credenciales
2. **Token Generation**: Backend genera JWT + refresh token
3. **Storage**: Tokens se almacenan en localStorage
4. **Route Protection**: Middleware protege rutas del dashboard
5. **Auto-refresh**: Sistema renueva tokens automáticamente
6. **Logout**: Limpieza de tokens y redirección

### **Componentes de Auth**

- **LoginForm**: Formulario de inicio de sesión
- **RegisterForm**: Formulario de registro
- **ProtectedRoute**: Wrapper para rutas protegidas
- **AuthErrorDisplay**: Visualización de errores de auth

## 🎨 Sistema de Diseño

### **Tema y Colores**

- **Modo Claro/Oscuro**: Toggle automático de tema
- **Paleta de Colores**: Colores consistentes en toda la app
- **Tipografía**: Sistema de fuentes escalable
- **Espaciado**: Sistema de espaciado consistente

### **Componentes UI**

- **shadcn/ui**: Componentes base modernos y accesibles
- **Radix UI**: Primitivos de UI sin estilos
- **Tailwind CSS**: Framework de CSS utility-first
- **Responsive Design**: Diseño adaptativo para todos los dispositivos

### **Iconos y Assets**

- **Lucide Icons**: Iconografía moderna y consistente
- **SVG Support**: Soporte completo para gráficos vectoriales
- **Image Optimization**: Optimización automática de imágenes con Next.js

## 📱 Funcionalidades del Dashboard

### **Dashboard Principal (`/home`)**

- **Resumen General**: Estadísticas del club
- **Actividad Reciente**: Últimas actividades y eventos
- **Métricas Clave**: KPIs importantes del club
- **Accesos Rápidos**: Navegación a funciones principales

### **Gestión de Miembros (`/members`)**

- **Lista de Miembros**: Vista tabular con paginación
- **Perfil de Miembro**: Información detallada de cada miembro
- **Gestión de Membresías**: Estados y renovaciones
- **Búsqueda y Filtros**: Búsqueda avanzada de miembros

### **Gestión de Pagos (`/payments`)**

- **Historial de Pagos**: Registro completo de transacciones
- **Estados de Pago**: Pending, completed, failed
- **Reportes Financieros**: Análisis de ingresos y gastos
- **Gestión de Cuotas**: Control de mensualidades y cuotas

### **Gestión de Roles (`/roles`)**

- **Configuración de Roles**: Crear y editar roles
- **Asignación de Permisos**: Gestión granular de permisos
- **Usuarios por Rol**: Vista de usuarios asignados a cada rol
- **Jerarquía de Roles**: Estructura organizacional del club

### **Gestión de Permisos (`/permissions`)**

- **Lista de Permisos**: Todos los permisos disponibles
- **Categorización**: Agrupación por módulos
- **Asignación**: Asignar permisos a roles
- **Auditoría**: Historial de cambios en permisos

### **Gestión de Usuarios (`/users`)**

- **Usuarios del Sistema**: Lista completa de usuarios
- **Perfiles de Usuario**: Información detallada
- **Gestión de Accesos**: Activar/desactivar usuarios
- **Historial de Actividad**: Logs de acciones del usuario

## 🌐 Internacionalización (i18n)

### **Idiomas Soportados**

- **Español** (es) - Idioma principal
- **Inglés** (en) - Idioma secundario
- **Extensible**: Fácil agregar nuevos idiomas

### **Características**

- **Cambio Dinámico**: Cambio de idioma en tiempo real
- **Persistencia**: Preferencia guardada en localStorage
- **Fallbacks**: Fallbacks automáticos para traducciones faltantes
- **Formateo**: Formateo de fechas, números y monedas por idioma

## 🔧 Configuración y Desarrollo

### **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos de TypeScript

# Testing (preparado para implementar)
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

### **Variables de Entorno**

```env
# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### **Configuración de Tailwind**

```javascript
// tailwind.config.ts
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

## 📊 Estado y Gestión de Datos

### **Contextos de React**

- **AuthContext**: Estado de autenticación global
- **LanguageContext**: Estado del idioma seleccionado
- **ThemeContext**: Estado del tema (claro/oscuro)

### **Hooks Personalizados**

- **useAuth**: Hook para autenticación
- **useMobile**: Hook para detectar dispositivos móviles
- **useToast**: Hook para notificaciones toast
- **useActivities**: Hook para gestión de actividades
- **useClub**: Hook para gestión del club
- **useMembers**: Hook para gestión de miembros
- **usePayments**: Hook para gestión de pagos
- **usePermissions**: Hook para gestión de permisos
- **useRoles**: Hook para gestión de roles
- **useUsers**: Hook para gestión de usuarios

### **Gestión de Estado**

- **Local State**: useState para estado local de componentes
- **Context State**: Estado global compartido entre componentes
- **Server State**: Datos del backend manejados con hooks personalizados
- **Form State**: Estado de formularios con React Hook Form

## 🧪 Testing y Calidad

### **Testing (Preparado para implementar)**

- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **MSW**: Mock Service Worker para APIs
- **Testing Library**: Utilidades para testing

### **Calidad de Código**

- **ESLint**: Linting de código JavaScript/TypeScript
- **Prettier**: Formateo automático de código
- **TypeScript**: Verificación de tipos estática
- **Husky**: Git hooks para pre-commit

### **Estructura de Tests**

```
__tests__/
├── components/          # Tests de componentes
├── hooks/              # Tests de hooks
├── utils/              # Tests de utilidades
├── mocks/              # Mocks y fixtures
└── setup.ts            # Configuración de tests
```

## 🚀 Despliegue

### **Plataformas Soportadas**

- **Vercel**: Despliegue automático desde GitHub
- **Netlify**: Despliegue con funciones serverless
- **AWS Amplify**: Despliegue en AWS
- **Docker**: Containerización para cualquier plataforma

### **Variables de Entorno de Producción**

```env
# Backend
NEXT_PUBLIC_BACKEND_URL=https://api.tuclub.com

# Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Performance
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### **Optimizaciones de Producción**

- **Code Splitting**: División automática de bundles
- **Image Optimization**: Optimización automática de imágenes
- **Static Generation**: Generación estática cuando sea posible
- **CDN**: Distribución de contenido global

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

### **Características Responsive**

- **Mobile-First**: Diseño optimizado para móviles
- **Touch-Friendly**: Interfaz optimizada para touch
- **Adaptive Layout**: Layouts que se adaptan al dispositivo
- **Performance Mobile**: Optimizaciones específicas para móviles

## 🔒 Seguridad

### **Medidas Implementadas**

- **HTTPS Only**: Redirección automática a HTTPS
- **CSP Headers**: Content Security Policy
- **XSS Protection**: Protección contra XSS
- **CSRF Protection**: Protección contra CSRF
- **Input Validation**: Validación de entrada en frontend y backend

### **Autenticación Segura**

- **JWT Storage**: Almacenamiento seguro de tokens
- **Token Expiration**: Expiración automática de tokens
- **Secure Logout**: Limpieza completa al cerrar sesión
- **Route Protection**: Protección de rutas sensibles

## 📈 Performance y Optimización

### **Métricas de Performance**

- **Core Web Vitals**: Optimización de métricas de Google
- **Lighthouse Score**: Objetivo: 90+ en todas las métricas
- **Bundle Size**: Objetivo: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

### **Optimizaciones Implementadas**

- **Code Splitting**: División automática de código
- **Lazy Loading**: Carga diferida de componentes
- **Image Optimization**: Optimización automática de imágenes
- **Tree Shaking**: Eliminación de código no utilizado
- **Service Worker**: Cache offline y actualizaciones

## 🔄 Integración con Backend

### **API Routes**

- **Proxy Routes**: Redirección de requests al backend
- **Error Handling**: Manejo centralizado de errores
- **Request/Response Interceptors**: Transformación de datos
- **Authentication Headers**: Inclusión automática de tokens

### **Endpoints Principales**

```typescript
// Autenticación
POST / api / auth / login;
POST / api / auth / register;
POST / api / auth / refresh;
GET / api / auth / me;

// Gestión de datos
GET / api / clubs;
GET / api / members;
GET / api / payments;
GET / api / roles;
GET / api / permissions;
GET / api / users;
```

### **Manejo de Errores**

- **Error Boundaries**: Captura de errores en componentes
- **Toast Notifications**: Notificaciones de error amigables
- **Fallback UI**: Interfaces de fallback para errores
- **Retry Logic**: Lógica de reintento para requests fallidos

## 🎯 Roadmap y Próximos Pasos

### **Corto Plazo (1-2 meses)**

- ✅ **Dashboard Básico**: Implementado
- ✅ **Autenticación**: Implementado
- ✅ **CRUD Básico**: Implementado
- 🔄 **Formularios Avanzados**: En desarrollo
- 🔄 **Validaciones**: En desarrollo

### **Mediano Plazo (2-4 meses)**

- 📋 **Notificaciones Push**: Sistema de notificaciones
- 📋 **Reportes Avanzados**: Gráficos y analytics
- 📋 **Búsqueda Global**: Búsqueda en toda la aplicación
- 📋 **Exportación de Datos**: PDF, Excel, CSV
- 📋 **Importación Masiva**: Carga de datos en lote

### **Largo Plazo (4+ meses)**

- 📋 **App Móvil**: Aplicación nativa
- 📋 **Offline Mode**: Funcionalidad offline
- 📋 **Real-time Updates**: WebSockets para actualizaciones
- 📋 **Advanced Analytics**: Métricas avanzadas y predicciones
- 📋 **Multi-tenant**: Soporte para múltiples clubs

## 🤝 Contribución

### **Cómo Contribuir**

1. **Fork del repositorio**
2. **Crear rama feature**: `git checkout -b feature/nueva-funcionalidad`
3. **Hacer cambios**: Implementar funcionalidad
4. **Tests**: Asegurar que todos los tests pasen
5. **Commit**: `git commit -m 'feat: agregar nueva funcionalidad'`
6. **Push**: `git push origin feature/nueva-funcionalidad`
7. **Pull Request**: Crear PR para revisión

### **Estándares de Código**

- **Conventional Commits**: Formato estándar para commits
- **TypeScript**: Uso obligatorio de TypeScript
- **ESLint**: Reglas de linting estrictas
- **Prettier**: Formateo automático de código
- **Testing**: Cobertura mínima del 80%

## 📞 Soporte y Contacto

### **Documentación**

- **Storybook**: Componentes documentados (preparado)
- **API Docs**: Documentación de la API
- **Component Library**: Biblioteca de componentes

### **Comunidad**

- **Issues**: Reportar bugs y solicitar features
- **Discussions**: Discusiones sobre el proyecto
- **Wiki**: Documentación adicional y guías

### **Desarrollo Local**

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/clubs-project.git

# Instalar dependencias
cd club-manager-app
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar desarrollo
npm run dev
```

---

## 🎉 ¡La aplicación frontend está lista para el desarrollo!

**Características implementadas:**

- ✅ Next.js 14 con App Router
- ✅ TypeScript completo
- ✅ Tailwind CSS + shadcn/ui
- ✅ Sistema de autenticación JWT
- ✅ Rutas protegidas
- ✅ Internacionalización (i18n)
- ✅ Tema claro/oscuro
- ✅ Componentes UI modernos
- ✅ Hooks personalizados
- ✅ Context API para estado global

**Para comenzar:**

1. Configura las variables de entorno en `.env.local`
2. Ejecuta `npm install` para instalar dependencias
3. Inicia el desarrollo con `npm run dev`
4. Accede a `http://localhost:3000`
5. ¡Comienza a desarrollar tu aplicación de gestión deportiva!

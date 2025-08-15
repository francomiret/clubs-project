# 🏆 Clubs Project - Sistema de Gestión Deportiva

## 📋 Descripción General

**Clubs Project** es una plataforma completa de gestión deportiva que permite a clubs, asociaciones y organizaciones deportivas administrar de manera eficiente todos los aspectos de su operación diaria. El proyecto incluye tanto el backend (NestJS) como el frontend (Next.js) para proporcionar una solución integral.

### **Características Principales**

- 🏗️ **Arquitectura Full-Stack**: Backend robusto con frontend moderno
- 🔐 **Autenticación JWT**: Sistema de seguridad empresarial
- 🛡️ **Sistema de Roles y Permisos**: Control granular de acceso
- 📱 **Responsive Design**: Interfaz adaptativa para todos los dispositivos
- 🌐 **Multi-idioma**: Soporte para español e inglés
- 📊 **Dashboard Intuitivo**: Gestión visual de todas las operaciones
- 🔄 **API RESTful**: Endpoints bien documentados y estructurados

## 🏗️ Arquitectura del Proyecto

### **Stack Tecnológico Completo**

#### **Backend (NestJS)**

- **Framework**: NestJS (Node.js framework empresarial)
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT + Passport.js
- **Documentación**: Swagger/OpenAPI 3.0
- **Testing**: Jest + Supertest (preparado)

#### **Frontend (Next.js)**

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Estado**: React Context + Hooks
- **Formularios**: React Hook Form + Zod
- **Internacionalización**: i18n con next-intl

#### **Infraestructura**

- **Base de Datos**: PostgreSQL
- **ORM**: Prisma (type-safe database client)
- **Containerización**: Docker + Docker Compose
- **Versionado**: Git con Conventional Commits

### **Estructura del Proyecto**

```
clubs-project/
├── nest/                    # Backend NestJS
│   ├── src/                # Código fuente del backend
│   ├── prisma/             # Esquema y migraciones de BD
│   ├── scripts/            # Scripts de utilidad
│   └── README.md           # Documentación del backend
├── club-manager-app/        # Frontend Next.js
│   ├── app/                # App Router (Next.js 14)
│   ├── components/         # Componentes reutilizables
│   ├── contexts/           # Contextos de React
│   ├── hooks/              # Hooks personalizados
│   └── README.md           # Documentación del frontend
└── README.md               # Este archivo - Documentación principal
```

## 🚀 Configuración Rápida

### **1. Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/clubs-project.git
cd clubs-project
```

### **2. Configurar Backend (NestJS)**

```bash
cd nest

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar base de datos
docker-compose up -d

# Aplicar migraciones
npm run db:migrate

# Poblar base de datos
npm run db:seed

# Iniciar servidor de desarrollo
npm run start:dev
```

**Backend disponible en**: `http://localhost:3001`

### **3. Configurar Frontend (Next.js)**

```bash
cd ../club-manager-app

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar aplicación
npm run dev
```

**Frontend disponible en**: `http://localhost:3000`

### **4. Verificar Instalación**

- **Backend**: `http://localhost:3001/api` (Swagger UI)
- **Frontend**: `http://localhost:3000` (Aplicación web)
- **Base de Datos**: PostgreSQL en `localhost:5432`

## 🔐 Sistema de Autenticación y Autorización

### **Características de Seguridad**

- **JWT Tokens**: Autenticación basada en tokens
- **Refresh Tokens**: Renovación automática de sesiones
- **Multi-Tenancy**: Cada club mantiene su información aislada
- **Role-Based Access Control**: Sistema granular de permisos
- **Auditoría Completa**: Tracking de todas las acciones

### **Flujo de Autenticación**

1. **Registro**: Usuario se registra con email y contraseña
2. **Login**: Autenticación con JWT + refresh token
3. **Protección**: Rutas protegidas automáticamente
4. **Auto-refresh**: Renovación automática de tokens
5. **Logout**: Limpieza segura de sesión

### **Roles y Permisos**

#### **ADMIN**

- Acceso completo a todas las funcionalidades
- Gestión de usuarios, roles y permisos
- Configuración del sistema

#### **MANAGER**

- Gestión de datos del club
- Sin acceso a configuración del sistema
- Permisos limitados de eliminación

#### **MEMBER**

- Acceso de solo lectura
- Visualización de información del club
- Participación en actividades

## 📊 Funcionalidades del Sistema

### **Gestión de Clubs**

- **Información del Club**: Datos básicos y configuración
- **Membresías**: Control de afiliados y suscripciones
- **Instalaciones**: Gestión de propiedades y horarios
- **Actividades**: Planificación de eventos y entrenamientos

### **Gestión de Miembros**

- **Perfiles Completos**: Información personal y deportiva
- **Estados de Membresía**: Active, inactive, pending
- **Historial de Actividades**: Participación en eventos
- **Comunicación**: Sistema de notificaciones integrado

### **Gestión Financiera**

- **Pagos y Cuotas**: Control de mensualidades y cuotas
- **Sponsors**: Administración de patrocinadores
- **Reportes**: Análisis de ingresos y gastos
- **Facturación**: Generación automática de facturas

### **Sistema de Roles y Permisos**

- **35 Permisos**: Sistema granular de control de acceso
- **Roles Personalizables**: Creación y edición de roles
- **Asignación Dinámica**: Cambio de permisos en tiempo real
- **Auditoría**: Historial completo de cambios

## 🌐 Interfaz de Usuario

### **Dashboard Principal**

- **Resumen Ejecutivo**: KPIs y métricas clave
- **Actividad Reciente**: Últimas acciones del sistema
- **Accesos Rápidos**: Navegación a funciones principales
- **Notificaciones**: Alertas y mensajes importantes

### **Módulos de Gestión**

- **Miembros**: Lista, perfiles, gestión de membresías
- **Pagos**: Historial, estados, reportes financieros
- **Roles**: Configuración, permisos, asignaciones
- **Usuarios**: Gestión de accesos y perfiles
- **Actividades**: Planificación y seguimiento de eventos

### **Características de UX**

- **Responsive Design**: Adaptativo para todos los dispositivos
- **Tema Claro/Oscuro**: Toggle automático de tema
- **Navegación Intuitiva**: Estructura clara y lógica
- **Búsqueda Avanzada**: Filtros y búsqueda en tiempo real

## 🔧 Desarrollo y Configuración

### **Scripts Disponibles**

#### **Backend (NestJS)**

```bash
# Base de datos
npm run db:studio      # Abrir Prisma Studio
npm run db:migrate     # Aplicar migraciones
npm run db:generate    # Generar cliente Prisma
npm run db:reset       # Resetear base de datos
npm run db:seed        # Poblar con datos de ejemplo

# Desarrollo
npm run start:dev      # Iniciar en modo desarrollo
npm run build          # Compilar el proyecto
npm run test           # Ejecutar tests
```

#### **Frontend (Next.js)**

```bash
# Desarrollo
npm run dev            # Iniciar servidor de desarrollo
npm run build          # Construir para producción
npm run start          # Iniciar servidor de producción
npm run lint           # Ejecutar ESLint
npm run type-check     # Verificar tipos de TypeScript
```

### **Variables de Entorno**

#### **Backend (.env)**

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clubs_db?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"

# Application
PORT=3001
NODE_ENV=development
```

#### **Frontend (.env.local)**

```env
# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 🧪 Testing y Calidad

### **Backend Testing**

- **Unit Tests**: Jest para testing de unidades
- **Integration Tests**: Testing de endpoints de API
- **E2E Tests**: Testing de flujos completos
- **Coverage**: Objetivo de 80%+ de cobertura

### **Frontend Testing**

- **Component Testing**: React Testing Library
- **Hook Testing**: Testing de hooks personalizados
- **E2E Testing**: Playwright para testing de usuario
- **Visual Testing**: Storybook para componentes

### **Calidad de Código**

- **ESLint**: Linting de JavaScript/TypeScript
- **Prettier**: Formateo automático de código
- **TypeScript**: Verificación estática de tipos
- **Husky**: Git hooks para pre-commit

## 🚀 Despliegue

### **Plataformas Soportadas**

#### **Backend**

- **Docker**: Containerización completa
- **AWS**: EC2, ECS, Lambda
- **Google Cloud**: Cloud Run, App Engine
- **Azure**: App Service, Container Instances

#### **Frontend**

- **Vercel**: Despliegue automático desde GitHub
- **Netlify**: Funciones serverless
- **AWS Amplify**: Despliegue en AWS
- **Docker**: Containerización para cualquier plataforma

### **Variables de Entorno de Producción**

```env
# Backend
DATABASE_URL="postgresql://user:pass@prod-db:5432/clubs_db"
JWT_SECRET="production-secret-key"
NODE_ENV=production

# Frontend
NEXT_PUBLIC_BACKEND_URL="https://api.tuclub.com"
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 📈 Performance y Escalabilidad

### **Métricas Objetivo**

- **API Response Time**: < 200ms para 95% de requests
- **Frontend Load Time**: < 2s para First Contentful Paint
- **Database Queries**: < 100ms para consultas simples
- **Concurrent Users**: Soporte para 1000+ usuarios simultáneos

### **Optimizaciones Implementadas**

- **Database Indexing**: Índices optimizados para consultas frecuentes
- **API Caching**: Cache de respuestas frecuentes
- **Frontend Optimization**: Code splitting y lazy loading
- **Image Optimization**: Optimización automática de imágenes

## 🔒 Seguridad

### **Medidas Implementadas**

- **HTTPS Only**: Redirección automática a HTTPS
- **JWT Security**: Tokens seguros con expiración
- **Input Validation**: Validación en frontend y backend
- **SQL Injection Protection**: Prisma ORM con queries parametrizadas
- **XSS Protection**: Sanitización de datos de entrada
- **CORS Configuration**: Control de acceso cross-origin

### **Autenticación y Autorización**

- **Password Hashing**: bcrypt con salt rounds
- **Token Expiration**: Expiración automática de sesiones
- **Role-based Access**: Control granular de permisos
- **Audit Logging**: Registro de todas las acciones

## 🌍 Internacionalización

### **Idiomas Soportados**

- **Español (es)**: Idioma principal
- **Inglés (en)**: Idioma secundario
- **Extensible**: Fácil agregar nuevos idiomas

### **Características**

- **Cambio Dinámico**: Cambio de idioma en tiempo real
- **Persistencia**: Preferencia guardada en localStorage
- **Formateo Local**: Fechas, números y monedas por idioma
- **Fallbacks**: Traducciones automáticas para contenido faltante

## 🎯 Roadmap del Proyecto

### **Fase 1 - Core System (Completado)**

- ✅ Sistema de autenticación JWT
- ✅ API RESTful completa
- ✅ Sistema de roles y permisos
- ✅ Base de datos optimizada
- ✅ Frontend básico con Next.js

### **Fase 2 - Enhanced Features (En Desarrollo)**

- 🔄 Dashboard avanzado con métricas
- 🔄 Sistema de notificaciones
- 🔄 Reportes y analytics
- 🔄 Gestión avanzada de actividades
- 🔄 Sistema de pagos integrado

### **Fase 3 - Advanced Features (Planificado)**

- 📋 App móvil nativa
- 📋 Real-time updates con WebSockets
- 📋 Machine learning para predicciones
- 📋 Integración con redes sociales
- 📋 API pública para desarrolladores

### **Fase 4 - Enterprise Features (Futuro)**

- 📋 Multi-tenant avanzado
- 📋 White-label solutions
- 📋 Integración con sistemas ERP
- 📋 Analytics avanzados y BI
- 📋 Marketplace de plugins

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
- **TypeScript**: Uso obligatorio en todo el proyecto
- **ESLint + Prettier**: Linting y formateo automático
- **Testing**: Cobertura mínima del 80%
- **Documentation**: Documentar todas las APIs y componentes

## 📞 Soporte y Contacto

### **Documentación Disponible**

- **Backend**: `nest/README.md` - Documentación completa del backend
- **Frontend**: `club-manager-app/README.md` - Documentación del frontend
- **API Docs**: `http://localhost:3001/api` - Swagger UI cuando el backend esté corriendo

### **Comunidad**

- **Issues**: Reportar bugs y solicitar features en GitHub
- **Discussions**: Discusiones sobre el proyecto
- **Wiki**: Documentación adicional y guías

### **Desarrollo Local**

```bash
# Clonar repositorio completo
git clone https://github.com/tu-usuario/clubs-project.git
cd clubs-project

# Configurar backend
cd nest
npm install
docker-compose up -d
npm run db:seed
npm run start:dev

# En otra terminal, configurar frontend
cd ../club-manager-app
npm install
npm run dev
```

## 🎉 Estado Actual del Proyecto

### **✅ Completado**

- **Backend API**: Sistema completo de gestión deportiva
- **Autenticación**: JWT con roles y permisos
- **Base de Datos**: Esquema optimizado con Prisma
- **Frontend Básico**: Next.js con autenticación
- **Documentación**: READMEs completos para ambas partes

### **🔄 En Desarrollo**

- **Dashboard Avanzado**: Métricas y analytics
- **Formularios**: CRUD completo para todas las entidades
- **Validaciones**: Validación robusta de datos
- **Testing**: Implementación de tests automatizados

### **📋 Próximos Pasos**

1. **Completar CRUD**: Implementar todas las operaciones CRUD
2. **Testing**: Agregar tests unitarios e integración
3. **UI/UX**: Mejorar la interfaz de usuario
4. **Performance**: Optimizar rendimiento y escalabilidad
5. **Despliegue**: Configurar CI/CD y despliegue automático

---

## 🚀 ¡El proyecto está listo para el desarrollo activo!

**Para comenzar:**

1. Sigue la configuración rápida en las secciones anteriores
2. Revisa la documentación específica de cada parte del proyecto
3. ¡Comienza a desarrollar tu sistema de gestión deportiva!

**Recursos adicionales:**

- **Backend**: `nest/README.md` para documentación técnica del backend
- **Frontend**: `club-manager-app/README.md` para documentación del frontend
- **API**: `http://localhost:3001/api` para explorar los endpoints disponibles

¡Bienvenido al desarrollo de Clubs Project! 🏆

# Designali Creative - Componentes Modularizados

Este directorio contiene la versión modularizada del componente `DesignaliCreative`, dividido en componentes más pequeños y manejables.

## Estructura de Archivos

```
creative/
├── index.ts                    # Exportaciones principales
├── types.ts                    # Definiciones de tipos TypeScript
├── data.ts                     # Datos de muestra
├── DesignaliCreative.tsx       # Componente principal
├── Sidebar.tsx                 # Componente de navegación lateral
├── Header.tsx                  # Componente de cabecera
├── sections/                   # Secciones de contenido
│   ├── HomeSection.tsx         # Sección de inicio
│   ├── AppsSection.tsx         # Sección de aplicaciones
│   ├── FilesSection.tsx        # Sección de archivos
│   ├── ProjectsSection.tsx     # Sección de proyectos
│   └── LearnSection.tsx        # Sección de aprendizaje
└── README.md                   # Este archivo
```

## Componentes

### Componente Principal

- **`DesignaliCreative.tsx`**: Componente principal que orquesta todos los demás componentes

### Componentes de Navegación

- **`Sidebar.tsx`**: Maneja la navegación lateral con soporte para móvil y escritorio
- **`Header.tsx`**: Barra superior con controles de navegación y notificaciones

### Secciones de Contenido

- **`HomeSection.tsx`**: Página de inicio con resumen de apps, archivos y proyectos
- **`AppsSection.tsx`**: Gestión de aplicaciones creativas
- **`FilesSection.tsx`**: Explorador de archivos
- **`ProjectsSection.tsx`**: Gestión de proyectos
- **`LearnSection.tsx`**: Tutoriales y recursos de aprendizaje

### Datos y Tipos

- **`types.ts`**: Interfaces TypeScript para todos los datos
- **`data.ts`**: Datos de muestra para las diferentes secciones

## Uso

```tsx
import { DesignaliCreative } from "@/components/creative";

export default function Page() {
  return <DesignaliCreative />;
}
```

## Ventajas de la Modularización

1. **Mantenibilidad**: Cada componente tiene una responsabilidad específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otras partes de la aplicación
3. **Testabilidad**: Es más fácil escribir pruebas para componentes más pequeños
4. **Legibilidad**: El código es más fácil de entender y navegar
5. **Colaboración**: Diferentes desarrolladores pueden trabajar en diferentes componentes simultáneamente

## Personalización

Para personalizar el componente:

1. **Datos**: Modifica los datos en `data.ts`
2. **Tipos**: Actualiza las interfaces en `types.ts`
3. **Estilos**: Modifica las clases de Tailwind CSS en cada componente
4. **Funcionalidad**: Agrega lógica específica en cada componente

## Dependencias

- React 18+
- Framer Motion (para animaciones)
- Lucide React (para iconos)
- Tailwind CSS (para estilos)
- shadcn/ui (para componentes de UI)

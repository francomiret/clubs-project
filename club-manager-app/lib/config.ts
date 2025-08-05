// Configuración del backend
export const BACKEND_CONFIG = {
    BASE_URL: process.env.BACKEND_URL || "http://localhost:3001",
    AUTH_ENDPOINTS: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        REFRESH: "/auth/refresh",
        PROFILE: "/auth/profile",
        LOGOUT: "/auth/logout",
    },
    API_ENDPOINTS: {
        USERS: "/users",
        MEMBERS: "/members",
        SPONSORS: "/sponsors",
        PAYMENTS: "/payments",
        CLUBS: "/clubs",
        ROLES: "/roles",
        PERMISSIONS: "/permissions",
        PROPERTIES: "/properties",
        ACTIVITIES: "/activities",
        CONFIG: "/config",
    },
} as const;

// Configuración del frontend
export const FRONTEND_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    ROUTES: {
        HOME: "/home",
        LOGIN: "/login",
        REGISTER: "/register",
        MEMBERS: "/members",
        USERS: "/users",
        SPONSORS: "/sponsors",
        PAYMENTS: "/payments",
        ROLES: "/roles",
        PERMISSIONS: "/permissions",
        PROPERTIES: "/properties",
        ACTIVITIES: "/activities",
    },
} as const;

// Función helper para construir URLs del backend
export const buildBackendUrl = (endpoint: string): string => {
    return `${BACKEND_CONFIG.BASE_URL}${endpoint}`;
};

// Función helper para construir URLs de autenticación
export const buildAuthUrl = (endpoint: keyof typeof BACKEND_CONFIG.AUTH_ENDPOINTS): string => {
    return buildBackendUrl(BACKEND_CONFIG.AUTH_ENDPOINTS[endpoint]);
};

// Función helper para construir URLs de API
export const buildApiUrl = (endpoint: keyof typeof BACKEND_CONFIG.API_ENDPOINTS): string => {
    return buildBackendUrl(BACKEND_CONFIG.API_ENDPOINTS[endpoint]);
};

// Configuración del sistema
export const SYSTEM_CONFIG = {
    DEFAULT_CLUB_ID: "club-example-id",
    DEFAULT_ROLE_ID: "c8376e07-d335-4b0f-a3e2-70a6c6dcf575", // MEMBER role
    ROLES: {
        ADMIN: "07ca500a-1ba4-4cd9-87d2-53e18db78b8a",
        MANAGER: "dccdd76e-cdc4-4508-b3cb-0397a2c2ce5e",
        MEMBER: "c8376e07-d335-4b0f-a3e2-70a6c6dcf575"
    }
} as const; 
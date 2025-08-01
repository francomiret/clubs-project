export interface JwtPayload {
    sub: string; // User ID
    email: string;
    role: string;
    clubId: string;
    iat?: number; // Issued at
    exp?: number; // Expiration time
}

export interface JwtRefreshPayload {
    sub: string; // User ID
    tokenId: string; // Unique token identifier
    iat?: number;
    exp?: number;
} 
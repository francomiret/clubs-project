import { ReactNode } from "react"

export interface App {
    name: string
    icon: string
    description: string
    category: string
    recent: boolean
    new: boolean
    progress: number
}

export interface RecentFile {
    name: string
    app: string
    modified: string
    icon: string
    shared: boolean
    size: string
    collaborators: number
}

export interface Project {
    name: string
    description: string
    progress: number
    dueDate: string
    members: number
    files: number
}

export interface Tutorial {
    title: string
    description: string
    duration: string
    level: string
    instructor: string
    category: string
    views: string
}

export interface CommunityPost {
    title: string
    author: string
    likes: number
    comments: number
    image: string
    time: string
}

export interface SidebarItem {
    title: string
    icon: string
    isActive?: boolean
    badge?: string
    items?: {
        title: string
        url: string
        badge?: string
    }[]
}

// Nuevos tipos para miembros
export interface Member {
    id: string
    name: string
    email: string
    clubId: string
    club?: Club
    payments?: Payment[]
    createdAt?: Date
}

export interface CreateMemberData {
    name: string
    email: string
    clubId: string
}

export interface UpdateMemberData extends Partial<CreateMemberData> { }

// Tipos para Users
export interface User {
    id: string
    email: string
    password: string
    name: string
    clubs?: UserClub[]
    createdAt?: Date
    updatedAt?: Date
}

export interface CreateUserData {
    email: string
    password: string
    name: string
}

export interface UpdateUserData extends Partial<CreateUserData> { }

// Tipos para Sponsors
export interface Sponsor {
    id: string
    name: string
    email: string
    clubId: string
    club?: Club
    payments?: Payment[]
    createdAt?: Date
}

export interface CreateSponsorData {
    name: string
    email: string
    clubId: string
}

export interface UpdateSponsorData extends Partial<CreateSponsorData> { }

// Tipos para Payments
export interface Payment {
    id: string
    amount: number
    type: 'INCOME' | 'EXPENSE'
    category?: string
    description?: string
    date: Date
    memberId?: string
    sponsorId?: string
    clubId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    club?: Club
    member?: Member
    sponsor?: Sponsor
}

export interface CreatePaymentData {
    amount: number
    type: 'INCOME' | 'EXPENSE'
    category?: string
    description?: string
    date: Date
    memberId?: string
    sponsorId?: string
    clubId: string
    isActive?: boolean
}

export interface UpdatePaymentData extends Partial<CreatePaymentData> { }

// Permission types
export interface Permission {
    id: string
    name: string
    description?: string
    roles?: RolePermission[]
}

export interface CreatePermissionData {
    name: string
    description?: string
}

export interface UpdatePermissionData {
    name?: string
    description?: string
}

// Role types
export interface Role {
    id: string
    name: string
    clubId: string
    club?: Club
    permissions?: RolePermission[]
    userClubs?: UserClub[]
}

export interface CreateRoleData {
    name: string
    clubId: string
    permissionIds?: string[]
}

export interface UpdateRoleData {
    name?: string
    clubId?: string
    permissionIds?: string[]
}

// RolePermission types (junction table)
export interface RolePermission {
    id: string
    roleId: string
    permissionId: string
    role?: Role
    permission?: Permission
}

// UserClub types (junction table for user-role-club)
export interface UserClub {
    id: string
    userId: string
    clubId: string
    roleId: string
    user?: User
    club?: Club
    role?: Role
}

// User Role Assignment
export interface AssignUserRoleData {
    userId: string
    clubId: string
    roleId: string
}

// Club types
export interface Club {
    id: string
    name: string
    alias?: string
    logo?: string
    location?: string
    foundationDate?: Date
    description?: string
    users?: UserClub[]
    roles?: Role[]
    members?: Member[]
    sponsors?: Sponsor[]
    payments?: Payment[]
    properties?: Property[]
    activities?: Activity[]
    createdAt?: Date
    updatedAt?: Date
}

export interface CreateClubData {
    name: string
    alias?: string
    logo?: string
    location?: string
    foundationDate?: Date
    description?: string
}

export interface UpdateClubData {
    name?: string
    alias?: string
    logo?: string
    location?: string
    foundationDate?: string
    description?: string
}

// Property types
export interface Property {
    id: string
    name: string
    location: string
    characteristics: string[]
    createdAt?: Date
    updatedAt?: Date
}

export interface CreatePropertyData {
    name: string
    location: string
    characteristics: string[]
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> { }

// Activity types
export interface Activity {
    id: string
    name: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface CreateActivityData {
    name: string
    description?: string
}

export interface UpdateActivityData extends Partial<CreateActivityData> { } 
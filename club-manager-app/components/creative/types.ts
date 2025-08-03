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
    role: string
    status: "active" | "inactive" | "pending"
    avatar: string
    joinDate: string
    lastActive: string
    projects: number
    skills: string[]
    department: string
    phone?: string
    location?: string
}

export interface CreateMemberData {
    name: string
    email: string
    role: string
    department: string
    phone?: string
    location?: string
    skills: string[]
}

export interface UpdateMemberData extends Partial<CreateMemberData> {
    status?: "active" | "inactive" | "pending"
}

// Tipos para Users
export interface User {
    id: string
    username: string
    email: string
    fullName: string
    role: "admin" | "manager" | "user" | "guest"
    status: "active" | "inactive" | "suspended"
    avatar: string
    joinDate: string
    lastLogin: string
    permissions: string[]
    department?: string
    phone?: string
    location?: string
}

export interface CreateUserData {
    username: string
    email: string
    fullName: string
    role: "admin" | "manager" | "user" | "guest"
    department?: string
    phone?: string
    location?: string
    permissions: string[]
}

export interface UpdateUserData extends Partial<CreateUserData> {
    status?: "active" | "inactive" | "suspended"
}

// Tipos para Sponsors
export interface Sponsor {
    id: string
    name: string
    company: string
    email: string
    phone: string
    website: string
    logo: string
    status: "active" | "inactive" | "pending"
    sponsorshipLevel: "platinum" | "gold" | "silver" | "bronze"
    startDate: string
    endDate: string
    amount: number
    currency: string
    description: string
    contactPerson: string
    notes?: string
}

export interface CreateSponsorData {
    name: string
    company: string
    email: string
    phone: string
    website: string
    sponsorshipLevel: "platinum" | "gold" | "silver" | "bronze"
    startDate: string
    endDate: string
    amount: number
    currency: string
    description: string
    contactPerson: string
    notes?: string
}

export interface UpdateSponsorData extends Partial<CreateSponsorData> {
    status?: "active" | "inactive" | "pending"
}

// Tipos para Payments
export interface Payment {
    id: string
    memberId: string
    memberName: string
    amount: number
    currency: string
    status: "pending" | "completed" | "failed" | "refunded"
    paymentMethod: "credit_card" | "bank_transfer" | "paypal" | "cash"
    transactionId: string
    date: string
    dueDate: string
    description: string
    category: "membership" | "event" | "donation" | "other"
    receiptUrl?: string
    notes?: string
}

export interface CreatePaymentData {
    memberId: string
    amount: number
    currency: string
    paymentMethod: "credit_card" | "bank_transfer" | "paypal" | "cash"
    dueDate: string
    description: string
    category: "membership" | "event" | "donation" | "other"
    notes?: string
}

export interface UpdatePaymentData extends Partial<CreatePaymentData> {
    status?: "pending" | "completed" | "failed" | "refunded"
    transactionId?: string
    receiptUrl?: string
} 
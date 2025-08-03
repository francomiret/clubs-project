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
import { SidebarItem, App, RecentFile, Project, Tutorial, CommunityPost, Member, User, Sponsor, Payment, Permission, Role, Club, UserClub, Property, Activity } from "./types"

// Sample data for apps
export const apps: App[] = [
    {
        name: "PixelMaster",
        icon: "ImageIcon",
        description: "Advanced image editing and composition",
        category: "Creative",
        recent: true,
        new: false,
        progress: 100,
    },
    {
        name: "VectorPro",
        icon: "Brush",
        description: "Professional vector graphics creation",
        category: "Creative",
        recent: true,
        new: false,
        progress: 100,
    },
    {
        name: "VideoStudio",
        icon: "Video",
        description: "Cinematic video editing and production",
        category: "Video",
        recent: true,
        new: false,
        progress: 100,
    },
    {
        name: "MotionFX",
        icon: "Sparkles",
        description: "Stunning visual effects and animations",
        category: "Video",
        recent: false,
        new: false,
        progress: 100,
    },
    {
        name: "PageCraft",
        icon: "Layers",
        description: "Professional page design and layout",
        category: "Creative",
        recent: false,
        new: false,
        progress: 100,
    },
    {
        name: "UXFlow",
        icon: "LayoutGrid",
        description: "Intuitive user experience design",
        category: "Design",
        recent: false,
        new: true,
        progress: 85,
    },
    {
        name: "PhotoLab",
        icon: "Camera",
        description: "Advanced photo editing and organization",
        category: "Photography",
        recent: false,
        new: false,
        progress: 100,
    },
    {
        name: "DocMaster",
        icon: "FileText",
        description: "Document editing and management",
        category: "Document",
        recent: false,
        new: false,
        progress: 100,
    },
    {
        name: "WebCanvas",
        icon: "Code",
        description: "Web design and development",
        category: "Web",
        recent: false,
        new: true,
        progress: 70,
    },
    {
        name: "3DStudio",
        icon: "CuboidIcon",
        description: "3D modeling and rendering",
        category: "3D",
        recent: false,
        new: true,
        progress: 60,
    },
    {
        name: "FontForge",
        icon: "Type",
        description: "Typography and font creation",
        category: "Typography",
        recent: false,
        new: false,
        progress: 100,
    },
    {
        name: "ColorPalette",
        icon: "Palette",
        description: "Color scheme creation and management",
        category: "Design",
        recent: false,
        new: false,
        progress: 100,
    },
]

// Sample data for recent files
export const recentFiles: RecentFile[] = [
    {
        name: "Brand Redesign.pxm",
        app: "PixelMaster",
        modified: "2 hours ago",
        icon: "ImageIcon",
        shared: true,
        size: "24.5 MB",
        collaborators: 3,
    },
    {
        name: "Company Logo.vec",
        app: "VectorPro",
        modified: "Yesterday",
        icon: "Brush",
        shared: true,
        size: "8.2 MB",
        collaborators: 2,
    },
    {
        name: "Product Launch Video.vid",
        app: "VideoStudio",
        modified: "3 days ago",
        icon: "Video",
        shared: false,
        size: "1.2 GB",
        collaborators: 0,
    },
    {
        name: "UI Animation.mfx",
        app: "MotionFX",
        modified: "Last week",
        icon: "Sparkles",
        shared: true,
        size: "345 MB",
        collaborators: 4,
    },
    {
        name: "Magazine Layout.pgc",
        app: "PageCraft",
        modified: "2 weeks ago",
        icon: "Layers",
        shared: false,
        size: "42.8 MB",
        collaborators: 0,
    },
    {
        name: "Mobile App Design.uxf",
        app: "UXFlow",
        modified: "3 weeks ago",
        icon: "LayoutGrid",
        shared: true,
        size: "18.3 MB",
        collaborators: 5,
    },
    {
        name: "Product Photography.phl",
        app: "PhotoLab",
        modified: "Last month",
        icon: "Camera",
        shared: false,
        size: "156 MB",
        collaborators: 0,
    },
]

// Sample data for projects
export const projects: Project[] = [
    {
        name: "Website Redesign",
        description: "Complete overhaul of company website",
        progress: 75,
        dueDate: "June 15, 2025",
        members: 4,
        files: 23,
    },
    {
        name: "Mobile App Launch",
        description: "Design and assets for new mobile application",
        progress: 60,
        dueDate: "July 30, 2025",
        members: 6,
        files: 42,
    },
    {
        name: "Brand Identity",
        description: "New brand guidelines and assets",
        progress: 90,
        dueDate: "May 25, 2025",
        members: 3,
        files: 18,
    },
    {
        name: "Marketing Campaign",
        description: "Summer promotion materials",
        progress: 40,
        dueDate: "August 10, 2025",
        members: 5,
        files: 31,
    },
]

// Sample data for tutorials
export const tutorials: Tutorial[] = [
    {
        title: "Mastering Digital Illustration",
        description: "Learn advanced techniques for creating stunning digital art",
        duration: "1h 45m",
        level: "Advanced",
        instructor: "Sarah Chen",
        category: "Illustration",
        views: "24K",
    },
    {
        title: "UI/UX Design Fundamentals",
        description: "Essential principles for creating intuitive user interfaces",
        duration: "2h 20m",
        level: "Intermediate",
        instructor: "Michael Rodriguez",
        category: "Design",
        views: "56K",
    },
    {
        title: "Video Editing Masterclass",
        description: "Professional techniques for cinematic video editing",
        duration: "3h 10m",
        level: "Advanced",
        instructor: "James Wilson",
        category: "Video",
        views: "32K",
    },
    {
        title: "Typography Essentials",
        description: "Create beautiful and effective typography for any project",
        duration: "1h 30m",
        level: "Beginner",
        instructor: "Emma Thompson",
        category: "Typography",
        views: "18K",
    },
    {
        title: "Color Theory for Designers",
        description: "Understanding color relationships and psychology",
        duration: "2h 05m",
        level: "Intermediate",
        instructor: "David Kim",
        category: "Design",
        views: "41K",
    },
]

// Sample data for community posts
export const communityPosts: CommunityPost[] = [
    {
        title: "Minimalist Logo Design",
        author: "Alex Morgan",
        likes: 342,
        comments: 28,
        image: "/placeholder.svg?height=300&width=400",
        time: "2 days ago",
    },
    {
        title: "3D Character Concept",
        author: "Priya Sharma",
        likes: 518,
        comments: 47,
        image: "/placeholder.svg?height=300&width=400",
        time: "1 week ago",
    },
    {
        title: "UI Dashboard Redesign",
        author: "Thomas Wright",
        likes: 276,
        comments: 32,
        image: "/placeholder.svg?height=300&width=400",
        time: "3 days ago",
    },
    {
        title: "Product Photography Setup",
        author: "Olivia Chen",
        likes: 189,
        comments: 15,
        image: "/placeholder.svg?height=300&width=400",
        time: "5 days ago",
    },
]

// Sample data for sidebar navigation
export const sidebarItems: SidebarItem[] = [
    {
        title: "Home",
        icon: "Home",
        isActive: true,
    },

    {
        title: "Properties",
        icon: "MapPin",
        badge: "4",
    },
    {
        title: "Activities",
        icon: "Activity",
        badge: "5",
    },
    {
        title: "Members",
        icon: "Users",
        badge: "8",
    },
    {
        title: "Users",
        icon: "User",
        badge: "5",
    },
    {
        title: "Sponsors",
        icon: "Building",
        badge: "4",
    },
    {
        title: "Payments",
        icon: "DollarSign",
        badge: "6",
    },
    {
        title: "Roles",
        icon: "Shield",
        badge: "3",
    },
    {
        title: "Permissions",
        icon: "Key",
        badge: "16",
    },
]

// Helper function to create consistent dates
const createDate = (dateString: string) => {
    return new Date(dateString);
};

// Sample data for members
export const members: Member[] = [
    {
        id: "1",
        name: "Sarah Chen",
        email: "sarah.chen@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2023-03-01"),
    },
    {
        id: "2",
        name: "Michael Rodriguez",
        email: "michael.rodriguez@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2022-01-15"),
    },
    {
        id: "3",
        name: "Emma Thompson",
        email: "emma.thompson@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2023-06-10"),
    },
    {
        id: "4",
        name: "David Kim",
        email: "david.kim@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Central"
        },
        createdAt: createDate("2023-09-05"),
    },
    {
        id: "5",
        name: "Priya Sharma",
        email: "priya.sharma@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2024-12-01"),
    },
    {
        id: "6",
        name: "Alex Morgan",
        email: "alex.morgan@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2023-04-15"),
    },
    {
        id: "7",
        name: "Olivia Chen",
        email: "olivia.chen@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Central"
        },
        createdAt: createDate("2023-02-20"),
    },
    {
        id: "8",
        name: "Thomas Wright",
        email: "thomas.wright@designali.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2023-07-25"),
    },
]

// Sample data for users
export const users: User[] = [
    {
        id: "1",
        email: "admin@designali.com",
        password: "hashed_password_1",
        name: "Administrator",
        createdAt: createDate("2022-01-01"),
        updatedAt: createDate("2024-01-01"),
    },
    {
        id: "2",
        email: "manager@designali.com",
        password: "hashed_password_2",
        name: "John Manager",
        createdAt: createDate("2023-03-15"),
        updatedAt: createDate("2024-01-01"),
    },
    {
        id: "3",
        email: "user@designali.com",
        password: "hashed_password_3",
        name: "Alice User",
        createdAt: createDate("2023-06-20"),
        updatedAt: createDate("2024-01-01"),
    },
    {
        id: "4",
        email: "guest@designali.com",
        password: "hashed_password_4",
        name: "Bob Guest",
        createdAt: createDate("2023-09-10"),
        updatedAt: createDate("2024-01-01"),
    },
    {
        id: "5",
        email: "suspended@designali.com",
        password: "hashed_password_5",
        name: "Charlie Suspended",
        createdAt: createDate("2023-04-05"),
        updatedAt: createDate("2024-01-01"),
    },
]

// Sample data for sponsors
export const sponsors: Sponsor[] = [
    {
        id: "1",
        name: "TechCorp Industries",
        email: "sponsor@techcorp.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2024-01-01"),
    },
    {
        id: "2",
        name: "DesignHub Creative",
        email: "partnership@designhub.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: createDate("2024-03-01"),
    },
    {
        id: "3",
        name: "InnovateLab Solutions",
        email: "contact@innovatelab.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Central"
        },
        createdAt: new Date("2024-06-01"),
    },
    {
        id: "4",
        name: "CreativeFlow Agency",
        email: "hello@creativeflow.com",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        createdAt: new Date("2023-09-01"),
    },
]

// Sample data for payments
export const payments: Payment[] = [
    {
        id: "1",
        amount: 150,
        description: "Annual membership fee",
        date: new Date("2024-01-15"),
        memberId: "1",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Central"
        },
        member: {
            id: "1",
            name: "Sarah Chen",
            email: "sarah.chen@designali.com",
            clubId: "club-1"
        }
    },
    {
        id: "2",
        amount: 75,
        description: "Workshop registration fee",
        date: new Date("2024-01-20"),
        memberId: "2",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        member: {
            id: "2",
            name: "Michael Rodriguez",
            email: "michael.rodriguez@designali.com",
            clubId: "club-1"
        }
    },
    {
        id: "3",
        amount: 200,
        description: "Premium membership upgrade",
        date: new Date("2024-01-18"),
        memberId: "3",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        member: {
            id: "3",
            name: "Emma Thompson",
            email: "emma.thompson@designali.com",
            clubId: "club-1"
        }
    },
    {
        id: "4",
        amount: 50000,
        description: "Platinum sponsorship payment",
        date: new Date("2024-01-22"),
        sponsorId: "1",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        sponsor: {
            id: "1",
            name: "TechCorp Industries",
            email: "sponsor@techcorp.com",
            clubId: "club-1"
        }
    },
    {
        id: "5",
        amount: 25000,
        description: "Gold sponsorship payment",
        date: new Date("2024-01-10"),
        sponsorId: "2",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        sponsor: {
            id: "2",
            name: "DesignHub Creative",
            email: "partnership@designhub.com",
            clubId: "club-1"
        }
    },
    {
        id: "6",
        amount: 300,
        description: "Annual membership + events package",
        date: new Date("2024-01-25"),
        memberId: "6",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        member: {
            id: "6",
            name: "Alex Morgan",
            email: "alex.morgan@designali.com",
            clubId: "club-1"
        }
    },
]

// Sample data for permissions
export const permissions: Permission[] = [
    {
        id: "1",
        name: "users.read",
        description: "Leer información de usuarios"
    },
    {
        id: "2",
        name: "users.create",
        description: "Crear nuevos usuarios"
    },
    {
        id: "3",
        name: "users.update",
        description: "Actualizar información de usuarios"
    },
    {
        id: "4",
        name: "users.delete",
        description: "Eliminar usuarios"
    },
    {
        id: "5",
        name: "members.read",
        description: "Leer información de miembros"
    },
    {
        id: "6",
        name: "members.create",
        description: "Crear nuevos miembros"
    },
    {
        id: "7",
        name: "members.update",
        description: "Actualizar información de miembros"
    },
    {
        id: "8",
        name: "members.delete",
        description: "Eliminar miembros"
    },
    {
        id: "9",
        name: "roles.read",
        description: "Leer información de roles"
    },
    {
        id: "10",
        name: "roles.create",
        description: "Crear nuevos roles"
    },
    {
        id: "11",
        name: "roles.update",
        description: "Actualizar información de roles"
    },
    {
        id: "12",
        name: "roles.delete",
        description: "Eliminar roles"
    },
    {
        id: "13",
        name: "permissions.read",
        description: "Leer información de permisos"
    },
    {
        id: "14",
        name: "permissions.create",
        description: "Crear nuevos permisos"
    },
    {
        id: "15",
        name: "permissions.update",
        description: "Actualizar información de permisos"
    },
    {
        id: "16",
        name: "permissions.delete",
        description: "Eliminar permisos"
    }
]

// Sample data for roles
export const roles: Role[] = [
    {
        id: "1",
        name: "ADMIN",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        permissions: [
            {
                id: "rp-1",
                roleId: "1",
                permissionId: "1",
                permission: { id: "1", name: "users.read", description: "Leer información de usuarios" }
            },
            {
                id: "rp-2",
                roleId: "1",
                permissionId: "2",
                permission: { id: "2", name: "users.create", description: "Crear nuevos usuarios" }
            },
            {
                id: "rp-3",
                roleId: "1",
                permissionId: "3",
                permission: { id: "3", name: "users.update", description: "Actualizar información de usuarios" }
            },
            {
                id: "rp-4",
                roleId: "1",
                permissionId: "4",
                permission: { id: "4", name: "users.delete", description: "Eliminar usuarios" }
            },
            {
                id: "rp-5",
                roleId: "1",
                permissionId: "5",
                permission: { id: "5", name: "members.read", description: "Leer información de miembros" }
            },
            {
                id: "rp-6",
                roleId: "1",
                permissionId: "6",
                permission: { id: "6", name: "members.create", description: "Crear nuevos miembros" }
            },
            {
                id: "rp-7",
                roleId: "1",
                permissionId: "7",
                permission: { id: "7", name: "members.update", description: "Actualizar información de miembros" }
            },
            {
                id: "rp-8",
                roleId: "1",
                permissionId: "8",
                permission: { id: "8", name: "members.delete", description: "Eliminar miembros" }
            },
            {
                id: "rp-9",
                roleId: "1",
                permissionId: "9",
                permission: { id: "9", name: "roles.read", description: "Leer información de roles" }
            },
            {
                id: "rp-10",
                roleId: "1",
                permissionId: "10",
                permission: { id: "10", name: "roles.create", description: "Crear nuevos roles" }
            },
            {
                id: "rp-11",
                roleId: "1",
                permissionId: "11",
                permission: { id: "11", name: "roles.update", description: "Actualizar información de roles" }
            },
            {
                id: "rp-12",
                roleId: "1",
                permissionId: "12",
                permission: { id: "12", name: "roles.delete", description: "Eliminar roles" }
            },
            {
                id: "rp-13",
                roleId: "1",
                permissionId: "13",
                permission: { id: "13", name: "permissions.read", description: "Leer información de permisos" }
            },
            {
                id: "rp-14",
                roleId: "1",
                permissionId: "14",
                permission: { id: "14", name: "permissions.create", description: "Crear nuevos permisos" }
            },
            {
                id: "rp-15",
                roleId: "1",
                permissionId: "15",
                permission: { id: "15", name: "permissions.update", description: "Actualizar información de permisos" }
            },
            {
                id: "rp-16",
                roleId: "1",
                permissionId: "16",
                permission: { id: "16", name: "permissions.delete", description: "Eliminar permisos" }
            }
        ]
    },
    {
        id: "2",
        name: "MANAGER",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        permissions: [
            {
                id: "rp-17",
                roleId: "2",
                permissionId: "1",
                permission: { id: "1", name: "users.read", description: "Leer información de usuarios" }
            },
            {
                id: "rp-18",
                roleId: "2",
                permissionId: "2",
                permission: { id: "2", name: "users.create", description: "Crear nuevos usuarios" }
            },
            {
                id: "rp-19",
                roleId: "2",
                permissionId: "3",
                permission: { id: "3", name: "users.update", description: "Actualizar información de usuarios" }
            },
            {
                id: "rp-20",
                roleId: "2",
                permissionId: "5",
                permission: { id: "5", name: "members.read", description: "Leer información de miembros" }
            },
            {
                id: "rp-21",
                roleId: "2",
                permissionId: "6",
                permission: { id: "6", name: "members.create", description: "Crear nuevos miembros" }
            },
            {
                id: "rp-22",
                roleId: "2",
                permissionId: "7",
                permission: { id: "7", name: "members.update", description: "Actualizar información de miembros" }
            },
            {
                id: "rp-23",
                roleId: "2",
                permissionId: "9",
                permission: { id: "9", name: "roles.read", description: "Leer información de roles" }
            },
            {
                id: "rp-24",
                roleId: "2",
                permissionId: "13",
                permission: { id: "13", name: "permissions.read", description: "Leer información de permisos" }
            }
        ]
    },
    {
        id: "3",
        name: "MEMBER",
        clubId: "club-1",
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        permissions: [
            {
                id: "rp-25",
                roleId: "3",
                permissionId: "1",
                permission: { id: "1", name: "users.read", description: "Leer información de usuarios" }
            },
            {
                id: "rp-26",
                roleId: "3",
                permissionId: "5",
                permission: { id: "5", name: "members.read", description: "Leer información de miembros" }
            }
        ]
    }
]

// Sample data for clubs (single club)
export const clubs: Club[] = [
    {
        id: "club-1",
        name: "Club Deportivo Central",
        alias: "CDC",
        logo: "/placeholder-logo.png",
        location: "Av. Central 123, Ciudad",
        foundationDate: createDate("1990-05-15"),
        description: "Club deportivo con más de 30 años de historia, dedicado al desarrollo del deporte y la comunidad.",
        createdAt: createDate("2024-01-01"),
        updatedAt: createDate("2024-01-01")
    }
]

// Sample data for properties
export const properties: Property[] = [
    {
        id: "1",
        name: "Estadio Principal",
        location: "Av. Central 123, Ciudad",
        characteristics: ["Cancha de fútbol", "Gradas", "Vestuarios", "Iluminación"],
        createdAt: createDate("2020-01-15"),
        updatedAt: createDate("2023-06-20"),
    },
    {
        id: "2",
        name: "Piscina Olímpica",
        location: "Av. Central 123, Ciudad",
        characteristics: ["Pileta olímpica", "Pileta de entrenamiento", "Vestuarios", "Calefacción"],
        createdAt: createDate("2018-03-10"),
        updatedAt: createDate("2022-12-15"),
    },
    {
        id: "3",
        name: "Cancha de Hockey",
        location: "Calle Norte 456, Ciudad",
        characteristics: ["Cancha de hockey", "Césped sintético", "Vestuarios", "Iluminación"],
        createdAt: createDate("2019-07-22"),
        updatedAt: createDate("2023-01-30"),
    },
    {
        id: "4",
        name: "Gimnasio Multideportivo",
        location: "Boulevard Sur 789, Ciudad",
        characteristics: ["Gimnasio", "Cancha de básquet", "Cancha de vóley", "Sala de pesas"],
        createdAt: createDate("2021-04-05"),
        updatedAt: createDate("2023-08-12"),
    },
]

// Sample data for activities
export const activities: Activity[] = [
    {
        id: "1",
        name: "Fútbol",
        description: "Escuela de fútbol para todas las edades",
        createdAt: createDate("2020-02-01"),
        updatedAt: createDate("2023-09-15"),
    },
    {
        id: "2",
        name: "Natación",
        description: "Clases de natación para principiantes y avanzados",
        createdAt: createDate("2018-04-01"),
        updatedAt: createDate("2023-07-20"),
    },
    {
        id: "3",
        name: "Hockey",
        description: "Equipo de hockey femenino y masculino",
        createdAt: createDate("2019-08-01"),
        updatedAt: createDate("2023-10-05"),
    },
    {
        id: "4",
        name: "Básquet",
        description: "Liga de básquet local",
        createdAt: createDate("2021-05-01"),
        updatedAt: createDate("2023-11-10"),
    },
    {
        id: "5",
        name: "Vóley",
        description: "Equipos de vóley recreativo y competitivo",
        createdAt: createDate("2021-06-01"),
        updatedAt: createDate("2023-12-01"),
    },
]

// Sample data for user clubs (user-role-club relationships)
export const userClubs: UserClub[] = [
    {
        id: "uc-1",
        userId: "1", // admin user
        clubId: "club-1",
        roleId: "1", // ADMIN role
        user: {
            id: "1",
            email: "admin@designali.com",
            password: "hashed_password_1",
            name: "Administrator",
            createdAt: new Date("2022-01-01"),
            updatedAt: new Date("2024-01-01"),
        },
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        role: {
            id: "1",
            name: "ADMIN",
            clubId: "club-1"
        }
    },
    {
        id: "uc-2",
        userId: "2", // manager user
        clubId: "club-1",
        roleId: "2", // MANAGER role
        user: {
            id: "2",
            email: "manager@designali.com",
            password: "hashed_password_2",
            name: "John Manager",
            createdAt: new Date("2023-03-15"),
            updatedAt: new Date("2024-01-01"),
        },
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        role: {
            id: "2",
            name: "MANAGER",
            clubId: "club-1"
        }
    },
    {
        id: "uc-3",
        userId: "3", // member user
        clubId: "club-1",
        roleId: "3", // MEMBER role
        user: {
            id: "3",
            email: "user@designali.com",
            password: "hashed_password_3",
            name: "Alice User",
            createdAt: new Date("2023-06-20"),
            updatedAt: new Date("2024-01-01"),
        },
        club: {
            id: "club-1",
            name: "Club Deportivo Ejemplo"
        },
        role: {
            id: "3",
            name: "MEMBER",
            clubId: "club-1"
        }
    }
] 
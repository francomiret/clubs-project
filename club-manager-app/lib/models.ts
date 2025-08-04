export interface Club {
    id: string;
    name: string;
    users: UserClub[];
    roles: Role[];
    members: Member[];
    sponsors: Sponsor[];
    payments: Payment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    clubs: UserClub[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserClub {
    id: string;
    userId: string;
    clubId: string;
    roleId: string;
    user: User;
    club: Club;
    role: Role;
}

export interface Role {
    id: string;
    name: string;
    clubId: string;
    club: Club;
    permissions: RolePermission[];
    userClubs: UserClub[];
}

export interface Permission {
    id: string;
    name: string;
    description?: string;
    roles: RolePermission[];
}

export interface RolePermission {
    id: string;
    roleId: string;
    permissionId: string;
    role: Role;
    permission: Permission;
}

export interface Member {
    id: string;
    name: string;
    email: string;
    clubId: string;
    club: Club;
    payments: Payment[];
    createdAt: Date;
}

export interface Sponsor {
    id: string;
    name: string;
    email: string;
    clubId: string;
    club: Club;
    payments: Payment[];
    createdAt: Date;
}

export interface Payment {
    id: string;
    amount: number;
    description?: string;
    date: Date;
    memberId?: string;
    sponsorId?: string;
    clubId: string;
    club: Club;
    member?: Member;
    sponsor?: Sponsor;
}

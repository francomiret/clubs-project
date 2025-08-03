export interface Club {
    id: string;
    name: string;
    users: User[];
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
    role: Role;
    clubId: string;
    club: Club;
    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    ADMIN = "ADMIN",
    TREASURER = "TREASURER",
    MEMBER = "MEMBER",
    SPONSOR = "SPONSOR",
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

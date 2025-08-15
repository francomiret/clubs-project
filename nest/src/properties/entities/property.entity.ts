export class Property {
    id: string;
    name: string;
    description: string | null;
    address: string;
    type: string;
    capacity: number | null;
    amenities: string[];
    clubId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

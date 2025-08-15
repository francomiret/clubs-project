export class Activity {
    id: string;
    name: string;
    description: string | null;
    type: string;
    startDate: Date;
    endDate: Date;
    location: string;
    maxParticipants: number | null;
    currentParticipants: number;
    clubId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

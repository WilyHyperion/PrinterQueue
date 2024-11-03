
export interface Job {
    userId: string;
    status: string;
    name: string;
    id: string;
    date: Date;
    user: any;
    inFillPercentage: number;
    color: string;
    printer: string;
}
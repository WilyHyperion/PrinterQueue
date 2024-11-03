
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
    notes: string;
    teacherNotes: string;
    printTime: string;
    cost: string;
}
export interface User {
    email: string;
    role: string;
    studentID: number;
    _id: string;
    id: string;
}
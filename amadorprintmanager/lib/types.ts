export interface JobRequest {
    userId: string;
    file: File;
    name: string;
}
export interface Job {
    id: string;
    userId: string;
    file: string;
    status: string;
    name: string;
}
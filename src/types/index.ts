export interface ToDo {
    idInFirebase?: string;
    synced?: boolean;
    id: number;
    title: string;
    description: string;
    date: string;
    hour: string;
    completed: boolean;
}
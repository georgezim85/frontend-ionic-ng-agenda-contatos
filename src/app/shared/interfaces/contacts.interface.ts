export interface ContactsSerie {
    count: number;
    next: string|null;
    previous: string|null;
    results: Array<ContactInterface>;
}

export interface ContactInterface {
    id?: number;
    name: string;
    gender: string;
    phone: string;
    email: string;
}
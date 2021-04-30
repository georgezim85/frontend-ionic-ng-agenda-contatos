export interface ContactsSerie {
    count: number;
    next: string|null;
    previous: string|null;
    results: Array<ContactsInterface>;
}

export interface ContactsInterface {
    id: number;
    name: string;
    gender: string;
    phone: string;
    email: string;
}
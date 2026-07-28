export interface Emp {
    id: number | null,
    name: string,
    location: string,
    phone: number | null,
    age: number | null
}

export interface Employee_tabel {
    id: number,
    fullName: string,
    age: number,
    email: string,
    phone: number,
    country: string,
    role: string,
}

export interface Address {
    country: string;
}

export interface Employee {
    id: number | null;
    firstName: string;
    lastName: string;
    age: number | null;
    email: string;
    phone: string;
    role: string;
    address: Address;
}


export class Address {
    addressLine1: string;
    state: string;
    city: string;
    postalCode: number;
}

export class Customer {
    name: string;
    email: string;
    password: string;
    contact: number;
    gender: string;
    address: Address;
    orders: string[];
}
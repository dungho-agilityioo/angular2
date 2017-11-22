export interface User {
    name: string;
    address: Address[];
}

export interface Address {
    street: string;
    postcode: string;
}

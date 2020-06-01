import { Book } from '../books/book';


export class Cart {

    public items: Item[];
    public totalAmount: number;
    public email: string;
}

export class Item {

    public book: Book;
    public quantity: number;
}
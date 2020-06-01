
export class Author {
    firstName: string;
    lastName: string;
}

export class Book {
    bookId: number;
    title: string;
    imageUrl: string;
    authors: Author[];
    category: string;
    publisher: string;
    noOfPages: number;
    rating: number;
    edition: number;
    price: number;
    releaseDate: Date
}
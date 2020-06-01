import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable()
export class BookService {

    baseUrl = "http://localhost:8000/";

    constructor(private http: HttpClient) { }

    findBooksByCategory(category: string): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl + "books/" + category);
    }

    findBookById(bookId: number): Promise<Book> {
        return this.http.get<Book>(this.baseUrl + "book/" + bookId).toPromise();
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from './cart';

@Injectable()
export class CartService {

    baseUrl = "http://localhost:8000/";

    constructor(private http: HttpClient) { }

    findCartByEmail(email: string): Observable<Cart> {
        return this.http.get<Cart>(this.baseUrl + "carts/" + email);
    }

    updateCart(cart: Cart): Observable<any> {
        return this.http.put<any>(this.baseUrl + "carts", cart);        
    }
}

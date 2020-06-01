import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable()
export class OrderService {

    baseUrl = "http://localhost:8000/";

    constructor(private http: HttpClient) { }

    findOrderById(orderId: string): Observable<Order> {
        return this.http.get<Order>(this.baseUrl + "order/" + orderId);
    }

    addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }
}
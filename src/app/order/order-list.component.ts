import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { OrderService } from './order.service';
import { Customer } from '../customer/customer';

@Component({
    templateUrl: "./order-list.component.html"
})
export class OrderListComponent implements OnInit {

    orders: Order[];

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        if(sessionStorage.getItem("orders") == null) {

            let customer:Customer = JSON.parse(sessionStorage.getItem("customer"));
            // for(let orderId in customer.orders) {
            //     this.orderService.findOrderById(orderId).subscribe((data) => {
            //         this.orders.push(data);
            //     });
            // } 
            console.log(customer.orders);
            sessionStorage.setItem("orders", JSON.stringify(this.orders));
        }
    }
}
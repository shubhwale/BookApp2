import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: "./order-details.component.html"
})
export class OrderDetailsComponent implements OnInit {

    order: Order;

    constructor(private route: ActivatedRoute) {}

   ngOnInit() {
        this.route.paramMap.subscribe((map) => {
            let order_id = map.get("orderId");
            let orders = JSON.parse(sessionStorage.getItem("orders"));
            for(let order of orders) {
                if(order.orderId == order_id) {
                    this.order = order;
                    break;
                }
            }
        })
   }     
}
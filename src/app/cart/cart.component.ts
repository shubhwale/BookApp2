import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { Order } from '../order/order';
import { OrderService } from '../order/order.service';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';


@Component({
    templateUrl: "./cart.component.html"
})
export class CartComponent implements OnInit {

    cart: Cart;

    constructor(private router: Router,
                      private cartService: CartService,
                      private orderService: OrderService,
                      private customerService: CustomerService) { }

    ngOnInit() {
        if(sessionStorage.getItem("cart") == null) {
            alert("Please login");
            this.router.navigate(["/customer/login"]);
        }
        else {
            this.cart = JSON.parse(sessionStorage.getItem("cart"));
            this.calculateTotal(false);
        }
    }

    calculateTotal(flag: boolean) {
        if(this.cart.items.length > 0) {       
            this.cart.totalAmount = 0;     
            for(let item of this.cart.items) {
                this.cart.totalAmount = this.cart.totalAmount + (item.book.price * item.quantity);
            }            
            sessionStorage.setItem("cart", JSON.stringify(this.cart));
            if(flag || this.cart.totalAmount > 0) {
                this.cartService.updateCart(this.cart).subscribe((data) => {

                });
            }
        }
    }

    removeItemFromCart(i) {
        this.cart.items.splice(i, 1);
        if(this.cart.items.length == 0) {
            this.cart.totalAmount = 0;
            sessionStorage.setItem("cart", JSON.stringify(this.cart));
            this.cartService.updateCart(this.cart).subscribe((data) => {

            });
        }
        else {
            this.calculateTotal(true);
        }
    }

    async placeOrders() {
        
        let customer:Customer = JSON.parse(sessionStorage.getItem("customer"));
        for(let item of this.cart.items) {
            let order = new Order();
            order.item = item;
            order.totalAmount = item.book.price * item.quantity;            
            alert(order);
            await this.orderService.addOrder(order).subscribe((data) => {
                customer.orders.push(data.orderId);
            })
        }
        
        console.log(customer.orders);
        console.log(customer);
        await this.customerService.updateCustomerInfo(customer).subscribe((data)=>{
            if(data) {
                alert("updated customer details");
                console.log(customer);
                sessionStorage.setItem("customer", JSON.stringify(customer));
            }
        })

        alert("All orders are placed.");
        this.cart.items = [];
        await this.cartService.updateCart(this.cart).subscribe((data) => {
            sessionStorage.setItem("cart", JSON.stringify(this.cart));
        })

        this.router.navigate(["/orders"]);
    }
}
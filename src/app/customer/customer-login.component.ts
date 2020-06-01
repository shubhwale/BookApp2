import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
    selector: "customer-login",
    templateUrl: "./customer-login.component.html"
})
export class CustomerLoginComponent implements OnInit {

    constructor(private fb: FormBuilder, 
                   private customerService: CustomerService,
                   private cartService: CartService,
                   private router: Router) { }

    loginForm: FormGroup;
    customer: Customer = new Customer();

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email,
                    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            password: ["", Validators.required]
        })
    }

    get email() {  return this.loginForm.controls.email;  }
    get password() {  return this.loginForm.controls.password;  }

    authenticate() {
       Object.assign(this.customer, this.loginForm.value);
       this.customerService.authenticate(this.customer).subscribe((data) => { 
        if(data != null) {
                alert("Login successful...");
                this.cartService.findCartByEmail(this.customer.email)
                                       .subscribe((data) => {
                                           sessionStorage.setItem("cart", JSON.stringify(data));
                                       }, (err) => {
                                           alert("unable to fetch cart details");
                                           console.log(err);
                                       })   
                sessionStorage.setItem("customer", JSON.stringify(data));
                this.router.navigate(["/home"]);
           }          
       }, (err) => {       
            console.log(err); 
            alert("Invalid credentials...");
            this.loginForm.controls.email.setValue("");
            this.loginForm.controls.password.setValue("");       
       }) 
    }
}
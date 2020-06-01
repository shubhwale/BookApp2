import { Component, OnInit } from '@angular/core';
import { Customer, Address } from './customer';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';

@Component({
    selector: "customer-signup",
    templateUrl: "./customer-registration.component.html"
})
export class CustomerRegistrationComponent implements OnInit {

    states = ["Maharashtra", "Madhya Pradesh", "Karnataka", "Uttar Pradesh"];
    cities = ["Mumbai", "Bhopal", "Banglore", "Gurgaon"];

    customer: Customer;

    constructor(private customerService: CustomerService,
                      private router: Router) { }

    ngOnInit() {
        this.customer = new Customer();
        this.customer.address = new Address();
    }

    registerNewCustomer() {
        this.customerService.registerNewCustomer(this.customer).subscribe((data: Customer) => {
            if(data != null) {
                alert("Registration is successful");
                this.router.navigate(["/customer/login"]);
            }
        }, (err) => {
            alert("something went wrong");
            console.log(err);
        })
    }

}
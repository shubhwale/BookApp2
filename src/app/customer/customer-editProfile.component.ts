import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: "./customer-editProfile.component.html"
})
export class CustomerEditProfileComponent implements OnInit {

    customer: Customer;
    customerForm: FormGroup;
    states = ["Maharashtra", "Madhya Pradesh", "Karnataka", "Uttar Pradesh"];
    cities = ["Mumbai", "Bhopal", "Banglore", "Gurgaon"];

    constructor(private fb: FormBuilder,
                      private customerService: CustomerService,
                      private router: Router) { }

    ngOnInit() {
        this.customer = JSON.parse(sessionStorage.getItem("customer"));
        this.customerForm = this.fb.group({
            name: [this.customer.name],
            email: [this.customer.email],
            contact: [this.customer.contact],
            gender: [this.customer.gender],
            address: this.fb.group({
                addressLine1: [this.customer.address.addressLine1],
                state: [this.customer.address.state],
                city: [this.customer.address.city],
                postalCode: [this.customer.address.postalCode]
            })
        })
    }

    editProfile() {
        Object.assign(this.customer, this.customerForm.value);
        console.log(this.customer);
        this.customerService.updateCustomerInfo(this.customer)
                                       .subscribe((data) => {
                                           if(data) {
                                               alert("Profile is updated successfully...");                                               
                                               sessionStorage.setItem("customer", JSON.stringify(this.customer));
                                               this.router.navigate(["/home"]);
                                           } 
                                       }, (err) => {
                                           alert("Failed to update record...");
                                           console.log(err);
                                       })  
    }

}
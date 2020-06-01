import { NgModule } from '@angular/core';
import { CustomerLoginComponent } from './customer-login.component';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { customerRoutes } from './customer.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { CustomerEditProfileComponent } from './customer-editProfile.component';

@NgModule({
    declarations: [
        CustomerLoginComponent,
        CustomerRegistrationComponent,
        CustomerEditProfileComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(customerRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        CustomerService
    ]
})
export class CustomerModule {

}
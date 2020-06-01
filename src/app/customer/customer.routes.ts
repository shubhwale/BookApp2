import { Routes } from '@angular/router';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { CustomerLoginComponent } from './customer-login.component';
import { CustomerEditProfileComponent } from './customer-editProfile.component';

export const customerRoutes: Routes = [
    { path: "customer/signup", component: CustomerRegistrationComponent},
    { path: "customer/login", component: CustomerLoginComponent },
    { path: "customer/editProfile", component: CustomerEditProfileComponent}
]
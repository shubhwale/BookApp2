import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CartService } from './cart.service';

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild([
            { path: "cart", component: CartComponent }
        ]),
        FormsModule
    ],
    providers: [ CartService ]
})
export class CartModule {

}
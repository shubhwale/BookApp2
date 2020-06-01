import { NgModule } from '@angular/core';
import { OrderListComponent } from './order-list.component';
import { OrderDetailsComponent } from './order-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { orderRoutes } from './order.routes';
import { OrderService } from './order.service';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderDetailsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(orderRoutes)
    ],
    providers: [ OrderService ]
})
export class OrderModule {

}
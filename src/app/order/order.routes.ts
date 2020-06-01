import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list.component';
import { OrderDetailsComponent } from './order-details.component';

export const orderRoutes: Routes = [
    { path: "orders", component: OrderListComponent },
    { path: "order/:orderId", component: OrderDetailsComponent }
]
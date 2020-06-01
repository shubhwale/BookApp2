import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from './app-routing.module';
import { BookModule } from './books/book.module';
import { CustomerModule } from './customer/customer.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { WelcomeComponent } from './welcome.component';
import { ResourceNotFoundComponent } from './resource-notfound.component';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@NgModule({
   declarations: [ 
      AppComponent,
      WelcomeComponent,
      ResourceNotFoundComponent
   ],
   imports: [ 
      BrowserModule,    
      BookModule,
      CustomerModule,
      CartModule,
      OrderModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [ AppComponent ] 
})
export class AppModule {
    
}
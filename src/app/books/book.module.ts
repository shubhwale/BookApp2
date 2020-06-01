import { NgModule } from '@angular/core';
import { BookListComponent } from './book-list.component';
import { BookDetailsComponent } from './book-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { bookRoutes } from './book.routes';
import { StarRatingComponent } from './star-rating.component';
import { BookService } from './book.service';
import { HttpClientModule } from "@angular/common/http";
import { DefaultPipe } from './default.pipe';

@NgModule({
    declarations: [
        BookListComponent,
        BookDetailsComponent,
        StarRatingComponent,
        DefaultPipe
    ],
    imports: [
       BrowserModule,
       RouterModule.forChild(bookRoutes),
       HttpClientModule
    ],
    providers: [ 
        BookService
    ]   
})
export class BookModule {

}
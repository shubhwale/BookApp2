import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from './book';
import { RouterModule } from '@angular/router';
//import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Item, Cart } from '../cart/cart';
import { CartService } from '../cart/cart.service';

@Component({
    templateUrl: "./book-details.component.html",
    selector: "book-details"
})
export class BookDetailsComponent implements OnInit { 

    book: Book;
    
    constructor(private bookService: BookService,
                      private route: ActivatedRoute,
                      private router: Router,
                      private cartService: CartService) { }

    ngOnInit() {
        this.route.paramMap.subscribe((map: ParamMap) => {
            let bookId = +map.get("bookId");
            this.bookService.findBookById(bookId)
            .then((data: Book) => {
                this.book = data;
            }, (err) => {
                console.log(err);
            })
        })
    }

    backPage() {
        this.router.navigate(["/books/" + this.book.category]);
    }

    addToCart(book) {
        if (sessionStorage.getItem("cart") == null) {
            alert("Please login...");
            this.router.navigate(["/customer/login"]);
        }
        else {
            let cart:Cart = JSON.parse(sessionStorage.getItem("cart"));
            let bookExists = false;
            if (cart.items.length > 0) {                
                for (let item of cart.items) {
                    if (item.book.bookId == book.bookId) {
                        item.quantity = item.quantity + 1;
                        bookExists = true;
                        alert("Book already present, new quantity is " + item.quantity);
                        break;
                    }
                }                
            }
            if(!bookExists) {
                let item = new Item();
                item.book = book;
                item.quantity = 1;
                cart.items.push(item);
                alert("Book is added successfully...");
            }
            sessionStorage.setItem("cart", JSON.stringify(cart)); 
            this.cartService.updateCart(cart).subscribe((data) =>{
                //console.log(data);
            })
            this.router.navigate(["/cart"]);           
        }
    }
}
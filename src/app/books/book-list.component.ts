import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from './book';
import { Item, Cart } from '../cart/cart';
import { CartService } from '../cart/cart.service';
import { retryWhen } from "rxjs/operators";
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: "./book-list.component.html",
    selector: "book-list"
})
export class BookListComponent implements OnInit {

    books: Book[];

    constructor(private bookService: BookService,
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService) { }
        
    private subscription: Subscription;

    cancelOperation() {
        console.log("User canceled the operation...");
        this.subscription.unsubscribe();
    }

    ngOnInit() {

        this.route.paramMap.subscribe((map: ParamMap) => {
            let category = map.get("category");
            this.subscription = this.bookService.findBooksByCategory(category)
                .pipe(retryWhen(_ => {
                    return interval(5000)
                }))
                .subscribe((data: Book[]) => {
                    this.books = data;
                }, (err) => {
                    console.log(err);
                });
        })
    }

    addToCart(book) {
        if (sessionStorage.getItem("cart") == null) {
            alert("Please login...");
            this.router.navigate(["/customer/login"]);
        }
        else {
            let cart: Cart = JSON.parse(sessionStorage.getItem("cart"));
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
            if (!bookExists) {
                let item = new Item();
                item.book = book;
                item.quantity = 1;
                cart.items.push(item);
                alert("Book is added successfully...");
            }
            sessionStorage.setItem("cart", JSON.stringify(cart));
            this.cartService.updateCart(cart).subscribe((data) => {
                //console.log(data);
            })
            this.router.navigate(["/cart"]);
        }
    }

    // books = [
    //     {
    //         "bookId": 101,
    //         "imageUrl": "assets/images/her_last_wish.jpeg",
    //         "title": "Her Last Wish",
    //         "price": 250,
    //         "rating": 3.2,
    //         "category": "Biographies"
    //     },
    //     {
    //         "bookId": 102,
    //         "imageUrl": "assets/images/lifes_amazing_secrets.jpeg",
    //         "title": "Lifes Amazing Secrets",
    //         "price": 300,
    //         "rating": 4,
    //         "category": "Biographies"
    //     },
    //     {
    //         "bookId": 103,
    //         "imageUrl": "assets/images/secret_of_nagas.jpeg",
    //         "title": "Secret of Nagas",
    //         "price": 400,
    //         "rating": 4.9,
    //         "category": "Biographies"
    //     }
    // ];
}
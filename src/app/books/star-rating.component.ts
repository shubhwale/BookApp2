import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: "star-rating",
    templateUrl: "./star-rating.component.html",
    styles: [
        `
            .crop {
                overflow: hidden
            }
        `
    ]

})
export class StarRatingComponent implements OnChanges {

    @Input() rating: number;
    starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }

}
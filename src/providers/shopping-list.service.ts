import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the ShoppingListService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ShoppingListService {

    private items: any[];

    constructor(public http: Http) {
    }

    getShoppingList() {
        this.items = [
            {"name": "バナナ","date": "2016-12-24"},
            {"name": "りんご","date": "2017-01-04"},
        ]

        return this.items;
    }

    addShopping(item) {
        this.items.push(item);
    }

}

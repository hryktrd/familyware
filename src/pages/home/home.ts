import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ShoppingListService} from "../../providers/shopping-list.service";
import * as moment from "moment/moment";
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage implements OnInit {

    private shoppingLists: any[];
    private shopping: string;
    private shoppingDate:string = moment().format('YYYY-MM-DD');

    constructor(public navCtrl: NavController, private shoppingList: ShoppingListService) {

    }

    ngOnInit() {
        this.shoppingLists = this.shoppingList.getShoppingList();
        console.log(this.shoppingDate);
    }

    itemSelected(item) {
    }

    addShppping() {
        let addObj = {"name": this.shopping, "date": this.shoppingDate};
        this.shoppingList.addShopping(addObj);
        this.shopping = '';
    }

}

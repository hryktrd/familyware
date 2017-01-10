import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ShoppingList} from "../../providers/shopping-list";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ShoppingList]
})
export class HomePage implements OnInit {

    private shoppingLists: any[];
    private shopping: any;

    constructor(public navCtrl: NavController, private shoppingList: ShoppingList) {

    }

    ngOnInit() {
        this.shoppingLists = this.shoppingList.getShoppingList();
    }

    itemSelected(item) {
        console.log(item);
    }

    addShppping() {
        let addObj = {"name": this.shopping};
        this.shoppingList.addShopping(addObj);
        this.shopping = '';
    }

}

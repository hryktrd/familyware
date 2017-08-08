import {AfterViewInit, Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ShoppingListService} from "../../providers/shopping-list.service";
import * as moment from "moment/moment";
import {Task} from "../../dto/Task";
import {UserInfo} from "../../providers/user-info";
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage implements AfterViewInit{

    private shoppingLists: Task[];
    private task: string;
    private shoppingDate:string = moment().format('YYYY-MM-DD');

    private userName: string;

    constructor(public navCtrl: NavController, private shoppingListService: ShoppingListService, private userInfo: UserInfo) {

    }

    ngAfterViewInit() {
        this.shoppingListService.getShoppingList().subscribe(shoppingLists => {
            this.shoppingLists = shoppingLists;
        });
    }

    itemSelected(item) {
        if(!item.comp_date) {
            item.comp_date = moment().format('YYYY-MM-DD');
        } else {
            item.comp_date = null;
        }

        this.shoppingListService.updateShopping(item).subscribe(tasks => this.shoppingLists = tasks);
    }

    addShppping() {
        let addObj: Task = {"task": this.task, "create_date": this.shoppingDate};
        this.shoppingListService.addShopping(addObj).subscribe(tasks => this.shoppingLists = tasks);
        this.task = '';
    }

}

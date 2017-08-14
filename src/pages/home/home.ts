import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ShoppingListService} from "../../providers/shopping-list.service";
import * as moment from "moment/moment";
import {Task} from "../../dto/Task";
import {UserInfo} from "../../providers/user-info";
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage implements OnInit {

    private shoppingLists: Task[];
    private task: string;
    private shoppingDate:string = moment().format('YYYY-MM-DD');

    constructor(private shoppingListService: ShoppingListService, private userInfo: UserInfo) {

    }

    ngOnInit() {
        this.shoppingListService.getShoppingList().subscribe(shoppingLists => {
            this.shoppingLists = shoppingLists;
        });
    }

    /**
     * 買い物リストのどれかをタップすると未処理だった買い物は終了日がついて処理済みに。
     * 処理済みだったものをタップすると未処理になる。
     * @param item
     */
    itemSelected(item) {
        if(!item.comp_date) {
            item.comp_date = moment().format('YYYY-MM-DD');
        } else {
            item.comp_date = null;
        }

        this.shoppingListService.updateShopping(item).subscribe(tasks => this.shoppingLists = tasks);
    }

    /**
     * 新たに買い物をリストに追加
     */
    addShppping() {
        let addObj: Task = {"task": this.task, "create_date": this.shoppingDate};
        this.shoppingListService.addShopping(addObj).subscribe(tasks => this.shoppingLists = tasks);
        this.task = '';
    }

}

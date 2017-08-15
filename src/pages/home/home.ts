import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {ShoppingListService} from "../../providers/shopping-list.service";
import * as moment from "moment/moment";
import {Task} from "../../dto/Task";
import {UserInfo} from "../../providers/user-info";
import {ContactService} from "../../providers/contact.service";
import {Family} from "../../dto/Family";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage implements OnInit {

    private shoppingLists: Task[];
    private task: string;
    private shoppingDate: string = moment().format('YYYY-MM-DD');
    private families: Family[];
    private selectedFamilyId: number;

    constructor(private alertCtrl: AlertController, private shoppingListService: ShoppingListService, private userInfo: UserInfo, private contactService: ContactService) {

    }

    ngOnInit() {
        this.getFamilies();
        this.getShopping();
    }

    familySelected() {
        console.log(this.selectedFamilyId);
        this.getShoppingByFamilyId(this.selectedFamilyId);
    }
    /**
     * 所属ファミリー取得
     */
    getFamilies() {
        this.contactService.getFamilies().subscribe(families => {
            this.families = families;
            this.selectedFamilyId = this.families[0].id;
            this.getShoppingByFamilyId(this.selectedFamilyId);
        });
    }

    /**
     * 買い物リストを取得（サービス内でUUIDを取得してサーバに問い合わせ
     */
    getShopping() {
        this.shoppingListService.getShoppingList().subscribe(shoppingLists => {
            this.shoppingLists = shoppingLists;
        })
    };

    /**
     * 買い物リストを取得（選択中のファミリーIDで問い合わせ）
     */
    getShoppingByFamilyId(family_id: number) {
        this.shoppingListService.getShoppingListByFamilyId(family_id).subscribe(shoppingLists => {
            this.shoppingLists = shoppingLists;
        })
    };

    /**
     * 買い物リストのどれかをタップすると未処理だった買い物は終了日がついて処理済みに。
     * 処理済みだったものをタップすると未処理になる。
     * @param item
     */
    itemSelected(item) {
        if (!item.comp_date) {
            item.comp_date = moment().format('YYYY-MM-DD');
        } else {
            item.comp_date = null;
        }

        this.shoppingListService.updateShopping(item).subscribe(() => this.getShoppingByFamilyId(this.selectedFamilyId));
    }

    /**
     * 新たに買い物をリストに追加
     */
    addShppping() {
        let addObj: Task = {"task": this.task, "create_date": this.shoppingDate, "group_id": this.selectedFamilyId};
        this.shoppingListService.addShopping(addObj).subscribe(() => this.getShoppingByFamilyId(this.selectedFamilyId));
        this.task = '';
    }

    /**
     * 買い物を削除
     * @param item
     */
    deleteShpping(id) {
        let alert = this.alertCtrl.create({
            title: '削除',
            message: 'この買い物を削除して良いですか？',
            buttons: [
                {
                    text: 'キャンセル',
                    role: 'cancel',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.shoppingListService.deleteShopping(id).subscribe(() => this.getShoppingByFamilyId(this.selectedFamilyId));
                    }
                }
            ]
        });
        alert.present();
    }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {ShoppingListService} from "../../providers/shopping-list.service";
import * as moment from "moment/moment";
import {Task} from "../../dto/Task";
import {UserInfo} from "../../providers/user-info";
import {ContactService} from "../../providers/contact.service";
import {Family} from "../../dto/Family";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage implements OnInit, OnDestroy {

    shoppingLists: Task[];
    task: string;
    shoppingDate: string = moment().format('YYYY-MM-DD');
    families: Family[] = [];
    selectedFamilyId: number;

    interval: number;
    timer: Observable<number>;
    alive = true;

    constructor(public alertCtrl: AlertController, public shoppingListService: ShoppingListService, public userInfo: UserInfo, public contactService: ContactService) {

    }

    ngOnInit() {
        this.interval = 10000;
        this.timer = Observable.timer(0, this.interval);
        this.timer
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.getFamilies();
            });
    }

    familySelected() {
        this.getShoppingByFamilyId(this.selectedFamilyId);
    }

    /**
     * 所属ファミリー取得
     */
    getFamilies() {
        this.contactService.getFamilies().subscribe(
            families => {
                this.families = [];
                for (let family of families) {
                    if (Number(family.confirm) === 1) {
                        this.families.push(family);
                    }
                }
                if (this.families.length !== 0) {
                    this.selectedFamilyId = this.families[0].id;
                    this.getShoppingByFamilyId(this.selectedFamilyId);
                } else {
                    this.shoppingLists = [];
                }
            },
            err => {
                let dupAlert = this.alertCtrl.create({
                    title: 'エラー: ' + err.status,
                    subTitle: '所属ファミリー一覧取得エラー。アプリを終了して再起動してください。',
                    buttons: ['OK']
                });
                dupAlert.present();
            });
    }

    /**
     * 買い物リストを取得（選択中のファミリーIDで問い合わせ）
     */
    getShoppingByFamilyId(family_id: number) {
        this.shoppingListService.getShoppingListByFamilyId(family_id).subscribe(
            shoppingLists => {
                this.shoppingLists = shoppingLists;
            },
            err => {
                let dupAlert = this.alertCtrl.create({
                    title: 'エラー: ' + err.status,
                    subTitle: '買い物リストを取得できません。一度アプリを再起動してください。',
                    buttons: ['OK']
                });
                dupAlert.present();
            });
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

        this.shoppingListService.updateShopping(item).subscribe(
            () => this.getShoppingByFamilyId(this.selectedFamilyId),
            err => {
                let dupAlert = this.alertCtrl.create({
                    title: 'エラー: ' + err.status,
                    subTitle: '買い物データを更新できません。一度アプリを再起動してください。',
                    buttons: ['OK']
                });
                dupAlert.present();
            });
    }

    /**
     * 新たに買い物をリストに追加
     */
    addShppping() {
        let addObj: Task = {"task": this.task, "create_date": this.shoppingDate, "group_id": this.selectedFamilyId};
        this.shoppingListService.addShopping(addObj).subscribe(
            () => this.getShoppingByFamilyId(this.selectedFamilyId),
            err => {
                let dupAlert = this.alertCtrl.create({
                    title: 'エラー: ' + err.status,
                    subTitle: '買い物を追加できません。一度アプリを再起動してください。',
                    buttons: ['OK']
                });
                dupAlert.present();
            });
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
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.shoppingListService.deleteShopping(id).subscribe(
                            () => this.getShoppingByFamilyId(this.selectedFamilyId),
                            err => {
                                let dupAlert = this.alertCtrl.create({
                                    title: 'エラー: ' + err.status,
                                    subTitle: '買い物を削除できません。一度アプリを再起動してください。',
                                    buttons: ['OK']
                                });
                                dupAlert.present();
                            });
                    }
                }
            ]
        });
        alert.present();
    }

    ngOnDestroy() {
        this.alive = false;
    }

}

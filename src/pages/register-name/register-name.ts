import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserInfo} from "../../providers/user-info";
import {TabsPage} from "../tabs/tabs";
import {UserService} from "../../providers/user.service";

/**
 * 名前登録ページ
 *
 * UUIDでサーバに問い合わせて未登録だった場合はこの画面が初期表示となり、名前を登録させる
 * TODO: 同じ名前がいた場合の警告表示
 */

@Component({
    selector: 'page-register-name',
    templateUrl: 'register-name.html',
})
export class RegisterNamePage {

    private name: string;

    constructor(public navCtrl: NavController, private userInfo: UserInfo, private userService: UserService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterNamePage');
    }

    /**
     * UUIDと名前を紐付け、ユーザIDを取得する。
     * 登録後通常のタブページに移動する
     */
    registerName() {
        this.userService.registerName(this.name).subscribe(user => {
            this.userInfo.setId(user.id);
            this.userInfo.setName(user.name);
            this.navCtrl.push(TabsPage);
        });
    }


}

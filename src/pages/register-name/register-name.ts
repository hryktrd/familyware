import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {UserInfo} from "../../providers/user-info";
import {TabsPage} from "../tabs/tabs";
import {UserService} from "../../providers/user.service";

/**
 * 名前登録ページ
 *
 * UUIDでサーバに問い合わせて未登録だった場合はこの画面が初期表示となり、名前を登録させる
 */

@Component({
    selector: 'page-register-name',
    templateUrl: 'register-name.html',
})
export class RegisterNamePage {

    public name: string;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public userInfo: UserInfo, public userService: UserService) {
    }

    /**
     * UUIDと名前を紐付け、ユーザIDを取得する。
     * 登録後通常のタブページに移動する
     */
    registerName() {
        this.userService.registerName(this.name).subscribe(
            user => {
                this.userInfo.setId(user.id);
                this.userInfo.setName(user.name);
                this.navCtrl.push(TabsPage);
            },
            err => {
                if (err.status === 409) {
                    let dupAlert = this.alertCtrl.create({
                        title: 'そのユーザ名はすでに存在しています',
                        subTitle: '違うユーザー名を指定してください。',
                        buttons: ['OK']
                    });
                    dupAlert.present();
                } else {
                    let dupAlert = this.alertCtrl.create({
                        title: 'エラー: ' + err.status,
                        subTitle: 'ユーザ登録エラー。アプリを再起動してください',
                        buttons: ['OK']
                    });
                    dupAlert.present();
                }
            }
        );
    }


}

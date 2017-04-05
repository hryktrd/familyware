import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {UserService} from "../../providers/user.service";
import {UserInfo} from "../../providers/user-info";

@Component({
    selector: 'page-make-account',
    templateUrl: 'make-account.html',
})
export class MakeAccountPage {

    name: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private userInfo: UserInfo, public toastCtrl: ToastController) {
    }

    registerName() {
        this.userService.registerName(this.name).subscribe(user => {
            this.userInfo.setName(user.name);
            this.navCtrl.push(HomePage)
        }, err => {
            let toast = this.toastCtrl.create({
                message: 'その名前は既に存在します。違う名前を登録してください',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    }
}

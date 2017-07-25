import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserInfo} from "../../providers/user-info";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the RegisterNamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-register-name',
    templateUrl: 'register-name.html',
})
export class RegisterNamePage {

    private name: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userInfo: UserInfo) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterNamePage');
    }

    registerName() {
        this.userInfo.setName(this.name);
        this.navCtrl.push(TabsPage);
    }


}

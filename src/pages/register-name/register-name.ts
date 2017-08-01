import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserInfo} from "../../providers/user-info";
import {TabsPage} from "../tabs/tabs";
import {UserService} from "../../providers/user.service";

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

    constructor(public navCtrl: NavController, private userInfo: UserInfo, private userService: UserService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterNamePage');
    }

    registerName() {
        this.userService.registerName(this.name).subscribe(user => {
            this.userInfo.setId(user.id);
            this.userInfo.setName(user.name);
            this.navCtrl.push(TabsPage);
        });
    }


}

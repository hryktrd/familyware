import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen, Device} from 'ionic-native';

import {TabsPage} from '../pages/tabs/tabs';
import {UserInfo} from "../providers/user-info";
import {UserService} from "../providers/user.service";


@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    rootPage = TabsPage;

    uuid: string;

    constructor(platform: Platform, private userInfo: UserInfo, private userService: UserService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            if (Device.uuid) {
                this.userInfo.setUuid(Device.uuid);
            } else {
                this.userInfo.setUuid('test-uuid');
            }

            this.userService.getUserInfo(this.userInfo.getUuid()).subscribe(user => {
                if(user.length != 0) {
                    console.log(user[0]);
                    this.userInfo.setName(user[0].name);
                }
                Splashscreen.hide();
            });

        });
    }
}

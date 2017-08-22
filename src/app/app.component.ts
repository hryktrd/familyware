import {Component, ViewChild} from '@angular/core';
import {StatusBar, Splashscreen, Device, AdMob} from 'ionic-native';

import {TabsPage} from '../pages/tabs/tabs';
import {UserInfo} from "../providers/user-info";
import {UserService} from "../providers/user.service";
import {AlertController, Nav, Platform} from "ionic-angular";
import {RegisterNamePage} from "../pages/register-name/register-name";


@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    // rootPage = TabsPage;
    rootPage: any;

    admobId: any;
    uuid: string;

    @ViewChild(Nav) nav;

    constructor(private alertCtrl: AlertController, platform: Platform, private userInfo: UserInfo, private userService: UserService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            if (Device.uuid) {
                this.userInfo.setUuid(Device.uuid);
            } else {
                this.userInfo.setUuid('test-uuid');
            }

            this.getUserInfo();

            if (/(android)/i.test(navigator.userAgent)) {
                this.admobId = {
                    banner: 'ca-app-pub-0759557937131268/4301493043',
                    // interstitial: 'ca-app-pub-jjj/kkk'
                };
            } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
                this.admobId = {
                    banner: 'ca-app-pub-0759557937131268/3697846057',
                    // interstitial: 'ca-app-pub-ppp/zzz'
                };
            }
            AdMob.createBanner({
                isTesting: false,
                autoShow: true
            });

        });
    }

    /**
     * サーバにユーザ情報問い合わせ
     */
    getUserInfo() {
        this.userService.getUserInfo().subscribe(
            user => {
                if (user.length != 0) {
                    this.userInfo.setName(user[0].name);
                    this.userInfo.setId(user[0].id);
                    this.rootPage = TabsPage;
                } else {
                    this.rootPage = RegisterNamePage;
                }
                Splashscreen.hide();
            },
            error => {
                let dupAlert = this.alertCtrl.create({
                    title: 'エラー: ' + error.status,
                    subTitle: 'ユーザー情報取得エラー。アプリを終了して再起動してください。',
                    buttons: ['OK']
                });
                dupAlert.present();
            }
        );
    }
}

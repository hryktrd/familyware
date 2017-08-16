import {Component, OnDestroy, OnInit} from '@angular/core';

import {ContactService} from "../../providers/contact.service";
import {Family} from "../../dto/Family";
import {User} from "../../dto/User";
import {AlertController} from 'ionic-angular';
import {UserConfirm} from "../../dto/UserConfirm";
import {Observable} from "rxjs/Observable";
import {UserInfo} from "../../providers/user-info";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit, OnDestroy {

    private families: Family[];
    private userConfirms: UserConfirm[];
    private searchUsers: User[];
    private familyName: string;
    private selectedFamilyId: number = null;
    private selectedUserId: number = null;
    private searchUserName: string;

    private interval: number;
    private timer: Observable<number>;
    private alive = true;

    constructor(private alertCtrl: AlertController, public contactService: ContactService, private userInfo: UserInfo) {

    }

    ngOnInit() {

        this.interval = 10000;
        this.timer = Observable.timer(0, this.interval);
        this.getFamilies();
        this.timer
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.getFamilies();
            });
    }

    /**
     * 所属ファミリー取得
     */
    getFamilies() {
        this.contactService.getFamilies().subscribe(families => {
            this.families = families
        });
    }

    /**
     * ファミリーボタンをクリック
     * @param id ファミリーID
     */
    clickFamily(id) {
        this.userConfirms = [];
        this.contactService.getUserByFamily(id).subscribe(userConfirms => {
            this.userConfirms = userConfirms;
            this.selectedFamilyId = id;
        });
    }

    /**
     *  ファミリー追加
     */
    addFamily() {
        if (this.familyName) {
            this.contactService.addFamily(this.familyName).subscribe(family => {
                this.families.push(family);
            });
        }
    }

    /**
     * ユーザー選択したIDを保存
     * @param id
     */
    selectUser(id) {
        this.selectedUserId = id;
    }

    /**
     * ユーザ名でユーザ検索
     * @returns {boolean}
     */
    searchUser() {
        this.contactService.getUserByName(this.searchUserName).subscribe(users => this.searchUsers = users);
    }

    /**
     * 選択ユーザーを選択ファミリーに追加
     */
    addUserToFamily(uesrId, name) {
        let alert = this.alertCtrl.create({
            title: 'ユーザーを追加します',
            message: name + ' さんを追加して良いですか？',
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
                        this.contactService.addUserToFamily(uesrId, this.selectedFamilyId).subscribe(
                            users => {
                                this.userConfirms = users;
                            },
                            err => {
                                if(err === 409) {
                                    let dupAlert = this.alertCtrl.create({
                                        title: 'そのユーザはすでに追加されています',
                                        subTitle: '違うユーザーを選択してください。',
                                        buttons: ['OK']
                                    });
                                    dupAlert.present();
                                }
                            });
                    }
                }
            ]
        });
        alert.present();
    }

    /**
     * ファミリー追加承認
     */
    confirmAddFamily(id) {
        this.contactService.confirmAddFamily(id).subscribe(
            res => {
                this.contactService.getFamilies().subscribe(families => {
                    this.families = families
                });
            }
        );
    }

    /**
     * ファミリー脱退
     * @returns {boolean}
     */
    leaveFamily(id) {
        let alert = this.alertCtrl.create({
            title: '脱退',
            message: 'このファミリーから脱退して良いですか？',
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
                        this.contactService.leaveFamily(id).subscribe(
                            res => {
                                this.contactService.getFamilies().subscribe(families => {
                                    this.families = families
                                });
                            }
                        );
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

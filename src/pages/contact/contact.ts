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

    families: Family[];
    userConfirms: UserConfirm[];
    searchUsers: User[];
    familyName: string;
    selectedFamilyId: number = null;
    selectedUserId: number = null;
    searchUserName: string;

    interval: number;
    timer: Observable<number>;
    alive = true;

    constructor(public alertCtrl: AlertController, public contactService: ContactService, public userInfo: UserInfo) {

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

    /**
     * 所属ファミリー取得
     */
    getFamilies() {
        this.contactService.getFamilies().subscribe(
            families => {
                this.families = families
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
     * ファミリーボタンをクリック
     * @param id ファミリーID
     */
    clickFamily(id) {
        this.userConfirms = [];
        this.contactService.getUserByFamily(id).subscribe(
            userConfirms => {
                this.userConfirms = userConfirms;
                this.selectedFamilyId = id;
            },
            err => {
                let dupAlert = this.alertCtrl.create({
                    title: 'エラー: ' + err.status,
                    subTitle: 'ユーザ一覧取得エラー。アプリを終了して再起動してください。',
                    buttons: ['OK']
                });
                dupAlert.present();
            }
        );
    }

    /**
     *  ファミリー追加
     */
    addFamily() {
        if (this.familyName) {
            this.contactService.addFamily(this.familyName).subscribe(
                family => {
                    this.families.push(family);
                },
                err => {
                    let dupAlert = this.alertCtrl.create({
                        title: 'エラー: ' + err.status,
                        subTitle: 'ファミリー追加に失敗しました。アプリを終了して再起動してください。',
                        buttons: ['OK']
                    });
                    dupAlert.present();
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
        this.contactService.getUserByName(this.searchUserName).subscribe(
            users => this.searchUsers = users,
            err => {
                    let dupAlert = this.alertCtrl.create({
                        title: 'エラー: ' + err.status,
                        subTitle: 'ユーザー検索エラー。アプリを再起動してください',
                        buttons: ['OK']
                    });
                    dupAlert.present();
            }
        );
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
                                if (err.status === 409) {
                                    let dupAlert = this.alertCtrl.create({
                                        title: 'そのユーザはすでに追加されています',
                                        subTitle: '違うユーザーを選択してください。',
                                        buttons: ['OK']
                                    });
                                    dupAlert.present();
                                }else {
                                    let dupAlert = this.alertCtrl.create({
                                        title: 'エラー: ' + err.status,
                                        subTitle: 'ユーザー追加でエラーが発生しました。アプリを再起動してください。',
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
                this.contactService.getFamilies().subscribe(
                    families => {
                        this.families = families
                    },
                    err => {
                        let dupAlert = this.alertCtrl.create({
                            title: 'エラー: ' + err.status,
                            subTitle: '所属ファミリー一覧取得エラー。アプリを終了して再起動してください。',
                            buttons: ['OK']
                        });
                        dupAlert.present();
                    });
            },
            err => {
                let dupAlert = this.alertCtrl.create({
                    title: 'エラー: ' + err.status,
                    subTitle: 'ファミリー追加承認できません。一度アプリを再起動してください。',
                    buttons: ['OK']
                });
                dupAlert.present();
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
                                this.contactService.getFamilies().subscribe(
                                    families => {
                                        this.families = families
                                    },
                                    err => {
                                        let dupAlert = this.alertCtrl.create({
                                            title: 'エラー: ' + err.status,
                                            subTitle: '所属ファミリー一覧取得エラー。アプリを終了して再起動してください。',
                                            buttons: ['OK']
                                        });
                                        dupAlert.present();
                                    });
                            },
                            err => {
                                let dupAlert = this.alertCtrl.create({
                                    title: 'エラー: ' + err.status,
                                    subTitle: 'ファミリーから脱退できません。一度アプリを再起動してください。',
                                    buttons: ['OK']
                                });
                                dupAlert.present();
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

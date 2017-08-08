import {Component, OnInit} from '@angular/core';

import {NavController, PopoverController} from 'ionic-angular';
import {ContactService} from "../../providers/contact.service";
import {UserInfo} from "../../providers/user-info";
import {RegisterNamePage} from "../register-name/register-name";
import {Family} from "../../dto/Family";
import {User} from "../../dto/User";
import {AlertController} from 'ionic-angular';
import {UserConfirm} from "../../dto/UserConfirm";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

    private families: Family[];
    private userConfirms: UserConfirm[];
    private searchUsers: User[];
    private familyName: string;
    private selectedFamilyId: number = null;
    private selectedUserId: number = null;
    private searchUserName: string;

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private alertCtrl: AlertController, public contactService: ContactService, private userInfo: UserInfo) {

    }

    ngOnInit() {
        this.contactService.getFamilies().subscribe(families => {
            this.families = families
        });
    }

    /**
     * ファミリーボタンをクリック
     * @param id ファミリーID
     */
    clickFamily(id) {
        if (!this.userConfirms || this.userConfirms.length === 0) {
            this.contactService.getUserByFamily(id).subscribe(userConfirms => {
                this.userConfirms = userConfirms;
                this.selectedFamilyId = id;
            });
        } else {
            this.userConfirms = [];
            this.selectedFamilyId = null;
        }

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
                        // console.log('Cancel clicked');
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


    ionViewCanEnter() {
        if (this.userInfo.getName() != null) {
            return true;
        } else {
            this.navCtrl.push(RegisterNamePage);
        }
    }

}

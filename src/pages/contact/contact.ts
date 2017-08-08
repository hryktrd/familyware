import {Component, OnInit} from '@angular/core';

import {NavController, PopoverController} from 'ionic-angular';
import {ContactService} from "../../providers/contact.service";
import {UserInfo} from "../../providers/user-info";
import {Contact} from "../../dto/Contact";
import {RegisterNamePage} from "../register-name/register-name";
import {Family} from "../../dto/Family";
import {User} from "../../dto/User";
import {AlertController} from 'ionic-angular';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

    private families: Family[];
    private users: User[];
    private searchUsers: User[];
    private familyName: string;
    private selectedFamilyId: number = null;
    private selectedUserId: number = null;
    private searchUserName: string;

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private alertCtrl: AlertController, public contactService: ContactService, private userInfo: UserInfo) {

    }

    private contactId: string;

    addContact() {
        console.log(this.contactId);
    }

    ngOnInit() {
        this.contactService.getFamilies().subscribe(families => {
            this.families = families
        });
    }

    clickFamily(id) {
        if (!this.users || this.users.length === 0) {
            this.contactService.getUserByFamily(id).subscribe(users => {
                this.users = users;
                this.selectedFamilyId = id;
            });
        } else {
            this.users = [];
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
                        this.contactService.addUserToFamily(uesrId, this.selectedFamilyId).subscribe(users => this.users = users);
                    }
                }
            ]
        });
        alert.present();
    }


    ionViewCanEnter() {
        if (this.userInfo.getName() != null) {
            return true;
        } else {
            this.navCtrl.push(RegisterNamePage);
        }
    }

}

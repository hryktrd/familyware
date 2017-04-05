import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ContactService} from "../../providers/contact.service";
import {UserService} from "../../providers/user.service";
import {UserInfo} from "../../providers/user-info";
import {MakeAccountPage} from "../single/make-account";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

    private myContacts: any[];

    constructor(public navCtrl: NavController, public contacts: ContactService, private userService: UserService, private userInfo: UserInfo) {

    }

    private contactId: string;

    addContact() {
        console.log(this.contactId);
    }

    ngOnInit() {
        this.myContacts = this.contacts.getContacts();
    }

    ionViewCanEnter() {
        console.log(this.userInfo.getName());
        if (this.userInfo.getName() != null) {
            return true;
        } else {
            this.navCtrl.push(MakeAccountPage);
        }
    }

}

import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ContactService} from "../../providers/contact.service";
import {UserService} from "../../providers/user.service";
import {UserInfo} from "../../providers/user-info";
import {MakeAccountPage} from "../single/make-account";
import {Contact} from "../../dto/Contact";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

    private myContacts: Contact[];

    constructor(public navCtrl: NavController, public contacts: ContactService, private userInfo: UserInfo) {

    }

    private contactId: string;

    addContact() {
        console.log(this.contactId);
    }

    ngOnInit() {
        this.contacts.getContacts().subscribe(contacts => this.myContacts = contacts);
    }

    ionViewCanEnter() {
        if (this.userInfo.getName() != null) {
            return true;
        } else {
            this.navCtrl.push(MakeAccountPage);
        }
    }

}

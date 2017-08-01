import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ContactService} from "../../providers/contact.service";
import {UserInfo} from "../../providers/user-info";
import {Contact} from "../../dto/Contact";
import {RegisterNamePage} from "../register-name/register-name";
import {Family} from "../../dto/Family";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

    private myContacts: Contact[];
    private families: Family[];

    constructor(public navCtrl: NavController, public contacts: ContactService, private userInfo: UserInfo) {

    }

    private contactId: string;

    addContact() {
        console.log(this.contactId);
    }

    ngOnInit() {
        this.contacts.getFamilies().subscribe(families => {
            console.log(families);
            this.families = families
        });
    }

    ionViewCanEnter() {
        if (this.userInfo.getName() != null) {
            return true;
        } else {
            this.navCtrl.push(RegisterNamePage);
        }
    }

}

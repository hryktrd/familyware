import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ContactService} from "../../providers/contact.service";
import {UserInfo} from "../../providers/user-info";
import {Contact} from "../../dto/Contact";
import {RegisterNamePage} from "../register-name/register-name";
import {Family} from "../../dto/Family";
import {User} from "../../dto/User";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

    private myContacts: Contact[];
    private families: Family[];
    private users: User[];

    constructor(public navCtrl: NavController, public contacts: ContactService, private userInfo: UserInfo) {

    }

    private contactId: string;

    addContact() {
        console.log(this.contactId);
    }

    ngOnInit() {
        this.contacts.getFamilies().subscribe(families => {
            this.families = families
        });
    }

    clickFamily(id) {
        this.contacts.getUserByFamily(id).subscribe(users => {
            this.users = users
            console.log(this.users);
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

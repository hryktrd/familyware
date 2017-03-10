import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ContactService} from "../../providers/contact.service";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

    private myContacts: any[];

    constructor(public navCtrl: NavController, public contacts: ContactService) {

    }

    private contactId: string;

    addContact() {
        console.log(this.contactId);
    }

    ngOnInit() {
        this.myContacts = this.contacts.getContacts();
        console.log(this.myContacts);
    }

}

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

    private familyUrl = 'http://localhost/api/v1/family/';

    private families: Family[];
    private users: User[];
    private failyName: string;

    constructor(public navCtrl: NavController, public contactService: ContactService, private userInfo: UserInfo) {

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
        if(!this.users || this.users.length === 0) {
            this.contactService.getUserByFamily(id).subscribe(users => {
                this.users = users;
            });
        } else {
            this.users = [];
        }

    }

    addFamily() {
        if(this.failyName) {
            this.contactService.addFamily(this.failyName).subscribe(family => {
                this.families.push(family);
            });
        }
    }

    ionViewCanEnter() {
        if (this.userInfo.getName() != null) {
            return true;
        } else {
            this.navCtrl.push(RegisterNamePage);
        }
    }

}

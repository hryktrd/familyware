import {Component, EventEmitter, Output} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Family} from "../../dto/Family";
import {ContactService} from "../../providers/contact.service";

/**
 * Generated class for the AddFamilyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-add-family',
    templateUrl: 'add-family.html',
})
export class AddFamilyPage {

    familyName: string;
    families: Family[];

    @Output() saved = new EventEmitter();

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private contactService: ContactService) {
    }

    addFamily() {
        if (this.familyName) {
            this.contactService.addFamily(this.familyName).subscribe(family => {
                this.saved.emit(family);
            });
        }
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddFamilyPage');
    }

}

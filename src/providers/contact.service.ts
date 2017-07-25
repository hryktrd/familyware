import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {Contact} from "../dto/Contact";
import {UserInfo} from "./user-info";
/*
 Generated class for the ContactService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ContactService {
    private contactUrl = 'http://localhost/api/v1/contact/';

    constructor(public http: Http, public userInfo: UserInfo) {
    }

    getContacts(){
        return this.http.get(this.contactUrl + this.userInfo.getUuid()).map(res => res.json() as Contact[]);
    }

}



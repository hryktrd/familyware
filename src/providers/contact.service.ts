import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {Contact} from "../dto/Contact";
import {UserInfo} from "./user-info";
import {Family} from "../dto/Family";
import {User} from "../dto/User";
/*
 Generated class for the ContactService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ContactService {
    private familyUrl = 'http://localhost/api/v1/family/';

    constructor(public http: Http, public userInfo: UserInfo) {
    }

    getFamilies(){
        return this.http.get(this.familyUrl + this.userInfo.getUuid()).map(res => res.json() as Family[]);
    }

    getUserByFamily(id){
        return this.http.get(this.familyUrl + id + '/user').map(res => res.json() as User[]);
    }

}



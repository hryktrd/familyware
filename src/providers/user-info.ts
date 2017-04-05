import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the UserInfo provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserInfo {

    constructor(public http: Http) {

    }

    private name: string = null;
    private uuid: string = null;

    getName() {
        return this.name;
    }

    getUuid() {
        return this.uuid;
    }

    setName(name) {
        this.name = name;
    }

    setUuid(uuid) {
        this.uuid = uuid;
    }

}

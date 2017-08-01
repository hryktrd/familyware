import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

/*
 Generated class for the UserInfo provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserInfo {

    id: number = null;
    name: string = null;
    uuid: string = null;

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUuid() {
        return this.uuid;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setUuid(uuid) {
        this.uuid = uuid;
    }

}

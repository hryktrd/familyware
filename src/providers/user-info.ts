import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

/*
 ユーザー情報を保持するクラス
 TODO: getter setterがわざわざいるのか考える
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

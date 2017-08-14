import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {UserInfo} from "./user-info";
import {Family} from "../dto/Family";
import {User} from "../dto/User";
import {Observable} from "rxjs/Observable";
import {UserConfirm} from "../dto/UserConfirm";
/*
 Generated class for the ContactService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ContactService {
    private familyUrl = 'http://localhost/api/v1/family/';
    private userNameUrl = 'http://localhost/api/v1/user_name/';

    constructor(public http: Http, public userInfo: UserInfo) {
    }

    /**
     * UUIDを元に所属ファミリー一覧を取得
     * @returns {Observable<R>}
     */
    getFamilies(){
        return this.http.get(this.familyUrl + this.userInfo.getUuid()).map(res => res.json() as Family[]);
    }

    /**
     * 選択したファミリーに所属しているユーザーを取得
     * @param id ファミリーID
     * @returns {Observable<R>}
     */
    getUserByFamily(id){
        return this.http.get(this.familyUrl + id + '/user').map(res => res.json() as UserConfirm[]);
    }

    /**
     * 新規ファミリー追加
     * @param name ファミリー名
     * @returns {Observable<R>}
     */
    addFamily(name) {
        const data = {'name': name, 'uuid': this.userInfo.getUuid() };
        return this.http.post(this.familyUrl, JSON.stringify(data)).map(res => res.json() as Family);
    }

    /**
     * ユーザー名でユーザ一覧からあいまい検索
     * @param name 検索語句
     * @returns {Observable<R>}
     */
    getUserByName(name) {
        return this.http.get(this.userNameUrl + name).map(res => res.json().filter(user => user.uuid !== this.userInfo.uuid) as User[]);
    }

    /**
     * ユーザをファミリーに追加
     * @param userId
     * @param familyId
     * @returns {Observable<R|T>}
     */
    addUserToFamily(userId, familyId) {
        const data = {'user_id': userId};
        return this.http.post(this.familyUrl + familyId, JSON.stringify(data)).map(res => res.json() as User[])
            .catch((error: any) => {
                return Observable.throw(error.status);
            });
    }

    /**
     * ファミリーへの追加を承認
     * @param familyId
     * @returns {Observable<R>}
     */
    confirmAddFamily(familyId) {
        const data = {'user_id': this.userInfo.id};
        return this.http.put(this.familyUrl + familyId, JSON.stringify(data)).map(res => {
            res.status;
        });

    }

}



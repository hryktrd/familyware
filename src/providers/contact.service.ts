import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {UserInfo} from "./user-info";
import {Family} from "../dto/Family";
import {User} from "../dto/User";
import {Observable} from "rxjs/Observable";
import {UserConfirm} from "../dto/UserConfirm";
import {HttpClient} from "../share/http-client";
import {Config} from "./config";

/*
 Generated class for the ContactService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ContactService {
    private familyUrl: string;
    private userNameUrl: string;

    constructor(public http: HttpClient, public userInfo: UserInfo, private config: Config) {
        this.familyUrl = this.config.familyUrl;
        this.userNameUrl = this.config.userNameUrl;
    }

    /**
     * UUIDを元に所属ファミリー一覧を取得
     * @returns {Observable<R>}
     */
    getFamilies() {
        return this.http.get(this.familyUrl).map(res => res.json() as Family[]).catch((error: any) => {
            return Observable.throw(error);
        });
    }

    /**
     * 選択したファミリーに所属しているユーザーを取得
     * @param id ファミリーID
     * @returns {Observable<R>}
     */
    getUserByFamily(id) {
        return this.http.get(this.familyUrl + id + '/user').map(res => res.json() as UserConfirm[]).catch((error: any) => {
            return Observable.throw(error);
        });
    }

    /**
     * 新規ファミリー追加
     * @param name ファミリー名
     * @returns {Observable<R>}
     */
    addFamily(name) {
        const data = {'name': name};
        return this.http.post(this.familyUrl, JSON.stringify(data)).map(res => res.json() as Family).catch((error: any) => {
            return Observable.throw(error);
        })
    }

    /**
     * ユーザー名でユーザ一覧からあいまい検索
     * @param name 検索語句
     * @returns {Observable<R>}
     */
    getUserByName(name) {
        if (name !== '') {
            return this.http.get(this.userNameUrl + name).map(res => res.json().filter(user => user.uuid !== this.userInfo.uuid) as User[]).catch((error: any) => {
                return Observable.throw(error);
            });
        }
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
                return Observable.throw(error);
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
        }).catch((error: any) => {
            return Observable.throw(error);
        });

    }

    /**
     * ファミリーから脱退
     * @param familyId
     * @returns {Observable<R>}
     */
    leaveFamily(familyId) {
        return this.http.delete(this.familyUrl + familyId + '/' + this.userInfo.id).map(res => {
            res.status;
        }).catch((error: any) => {
            return Observable.throw(error);
        });

    }

}



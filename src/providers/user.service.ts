import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from '../dto/User';
import {Observable} from "rxjs";
import {UserInfo} from "./user-info";
import {HttpClient} from "../share/http-client";

@Injectable()
export class UserService {

    private allUserUrl = 'http://localhost/api/v1/user/';

    constructor(public http: HttpClient, private userInfo: UserInfo) {
    }

    /**
     * 全ユーザ取得 TODO: 本番では削除
     * @returns {Observable<R>}
     */
    getAll(): Observable<User[]> {
        return this.http.get(this.allUserUrl).map(res => res.json() as User[]);
    }

    /**
     * UUIDを元にユーザー情報取得
     * @param uuid
     * @returns {Observable<R>}
     */
    getUserInfo(): Observable<User[]> {
        return this.http.get(this.allUserUrl).map(res => res.json() as User[]);
    }

    /**
     * ユーザー名登録（初期使用時）
     * @param name
     * @returns {Observable<R>}
     */
    registerName(name: string): Observable<User> {
        let requestParam = {'name': name, 'uuid': this.userInfo.getUuid()};
        return this.http.post(this.allUserUrl, JSON.stringify(requestParam)).map(res => res.json() as User);
    }

}

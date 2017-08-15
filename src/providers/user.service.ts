import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from '../dto/User';
import {Observable} from "rxjs";
import {UserInfo} from "./user-info";
import {HttpClient} from "../share/http-client";
import {Config} from "./config";

@Injectable()
export class UserService {

    private userUrl: string;

    constructor(public http: HttpClient, private userInfo: UserInfo, private config: Config) {
        this.userUrl = this.config.userUrl;
    }

    /**
     * UUIDを元にユーザー情報取得
     * @param uuid
     * @returns {Observable<R>}
     */
    getUserInfo(): Observable<User[]> {
        return this.http.get(this.userUrl).map(res => res.json() as User[]);
    }

    /**
     * ユーザー名登録（初期使用時）
     * @param name
     * @returns {Observable<R>}
     */
    registerName(name: string): Observable<User> {
        let requestParam = {'name': name, 'uuid': this.userInfo.getUuid()};
        return this.http.post(this.userUrl, JSON.stringify(requestParam)).map(res => res.json() as User)
            .catch((error: any) => {
            return Observable.throw(error.status);
        });
    }

}

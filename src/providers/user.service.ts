import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../dto/User';
import {Observable} from "rxjs";
import {UserInfo} from "./user-info";

@Injectable()
export class UserService {

    private allUserUrl = 'http://localhost:8080/api/users/';

    constructor(public http: Http, private userInfo: UserInfo) {
    }

    getAll(): Observable<User[]> {
        return this.http.get(this.allUserUrl).map(res => res.json() as User[]);
    }

    getUserInfo(uuid: string): Observable<User[]> {
        return this.http.get(this.allUserUrl + '?uuid=' + uuid).map(res => res.json() as User[]);
    }

    registerName(name: string): Observable<User> {
        let requestParam = {'name': name, 'uuid': this.userInfo.getUuid()};
        return this.http.post(this.allUserUrl, requestParam).map(res => res.json() as User);
    }

}

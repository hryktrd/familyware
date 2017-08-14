import {Injectable} from '@angular/core';
import {Device} from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Task} from "../dto/Task";
import {Observable} from "rxjs/Observable";
import {Headers} from "@angular/http"
import {UserInfo} from "./user-info";

/*
 Generated class for the ShoppingListService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ShoppingListService {

    private taskUrl = 'http://localhost/api/v1/task/';
    jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });


    constructor(public http: Http, private userInfo: UserInfo) {
        if (Device.uuid) {
            this.userInfo.setUuid(Device.uuid);
        } else {
            this.userInfo.setUuid('test-uuid');
        }
    }

    /**
     * UUIDを元にユーザーに紐づくタスクを取得
     * @returns {Observable<R>}
     */
    getShoppingList(): Observable<Task[]> {
        return this.http.get(this.taskUrl + this.userInfo.uuid).map(res => res.json() as Task[]);
    }

    /**
     * 買い物追加
     * @param item
     * @returns {Observable<R>}
     * TODO: ファミリー選択
     */
    addShopping(item: Task) : Observable<Task[]> {
        return this.http.post(this.taskUrl, JSON.stringify(item), {headers: this.jsonHeaders}).map(res => res.json() as Task[]);
    }

    /**
     * 買い物情報更新
     * @param item
     * @returns {Observable<R>}
     */
    updateShopping(item: Task) : Observable<Task[]> {
        return this.http.put(this.taskUrl, JSON.stringify(item), {headers: this.jsonHeaders}).map(res => res.json() as Task[]);
    }


}

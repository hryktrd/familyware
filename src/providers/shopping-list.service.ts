import {Injectable} from '@angular/core';
import {Device} from 'ionic-native';
import 'rxjs/add/operator/map';
import {Task} from "../dto/Task";
import {Observable} from "rxjs/Observable";
import {UserInfo} from "./user-info";
import {HttpClient} from "../share/http-client";
import {Config} from "./config";

/*
 Generated class for the ShoppingListService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ShoppingListService {

    private taskUrl: string;

    constructor(public http: HttpClient, private userInfo: UserInfo, private config: Config) {
        this.taskUrl = this.config.taskUrl;
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
        return this.http.get(this.taskUrl).map(res => res.json() as Task[]);
    }

    /**
     * ファミリーIDを元に紐づくタスクを取得
     * @param family_id
     * @returns {Observable<Task[]>}
     */
    getShoppingListByFamilyId(family_id): Observable<Task[]> {
        return this.http.get(this.taskUrl + 'family/' + family_id).map(res => res.json() as Task[]);
    }

    /**
     * 買い物追加
     * @param item
     * @returns {Observable<R>}
     * TODO: ファミリー選択
     */
    addShopping(item: Task) : Observable<Task[]> {
        return this.http.post(this.taskUrl, JSON.stringify(item)).map(res => res.json() as Task[]);
    }

    /**
     * 買い物情報更新
     * @param item
     * @returns {Observable<R>}
     */
    updateShopping(item: Task) : Observable<Task[]> {
        return this.http.put(this.taskUrl, JSON.stringify(item)).map(res => res.json() as Task[]);
    }

    /**
     * 買い物削除
     */
    deleteShopping(id: number) : Observable<Task[]> {
        return this.http.delete(this.taskUrl + Number(id)).map(res => res.json() as Task[]);
    }

}

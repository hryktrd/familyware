import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Task} from "../dto/Task";
import {Observable} from "rxjs/Observable";
import {Headers} from "@angular/http"

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


    constructor(public http: Http) {
    }

    getShoppingList(): Observable<Task[]> {
        return this.http.get(this.taskUrl).map(res => res.json() as Task[]);
    }

    addShopping(item: Task) : Observable<Task[]> {
        return this.http.post(this.taskUrl, JSON.stringify(item), {headers: this.jsonHeaders}).map(res => res.json() as Task[]);
    }
    updateShopping(item: Task) : Observable<Task[]> {
        return this.http.put(this.taskUrl, JSON.stringify(item), {headers: this.jsonHeaders}).map(res => res.json() as Task[]);
    }


}

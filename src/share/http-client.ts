import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Device} from 'ionic-native';

@Injectable()
export class HttpClient {

    private uuid;

    constructor(private http: Http) {
        if (Device.uuid) {
            this.uuid = Device.uuid;
        } else {
            this.uuid = 'test-uuid';
        }
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Device-Uuid', this.uuid);
        headers.append('Content-Type', 'application/json');
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    put(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    }

    delete(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }
}
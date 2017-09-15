import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Device} from 'ionic-native';
import {AlertController} from 'ionic-angular';

@Injectable()
export class HttpClient {

    private uuid;

    constructor(private alertCtrl: AlertController, private http: Http) {
        if (Device.uuid) {
            this.uuid = Device.uuid;
        } else {
            let uuidAlert = this.alertCtrl.create({
                title: 'UUIDエラー',
                subTitle: '端末情報取得エラー。アプリを終了して再起動してください。',
                buttons: ['OK']
            });
            uuidAlert.present();
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
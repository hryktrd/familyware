import {Injectable} from '@angular/core';

/*
  Generated class for the Config provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Config {
    base_url = 'http://localhost/api/v1/';
    familyUrl = this.base_url + 'family/';
    userNameUrl = this.base_url + 'user_name/';

    taskUrl = this.base_url + 'task/';
    userUrl = this.base_url + 'user/';
}

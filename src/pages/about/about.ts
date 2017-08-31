import {Component, OnInit} from '@angular/core';
import {UserService} from '../../providers/user.service';
import {UserInfo} from '../../providers/user-info';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage implements OnInit{
    userName: string;

    constructor(private userService: UserService, private userInfo: UserInfo) {

    }

    ngOnInit() {
        this.userName = this.userInfo.getName();
    }

    updateUserName() {
        this.userService.updateUserName(this.userName).subscribe( userInfo => this.userInfo.setName(userInfo.name));
    }
}

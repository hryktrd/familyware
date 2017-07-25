import {Component, ViewChild} from '@angular/core';

import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {Nav, NavController} from "ionic-angular";
import {UserInfo} from "../../providers/user-info";
import {RegisterNameComponent} from "../../components/register-name/register-name";
import {RegisterNamePage} from "../register-name/register-name";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page

    tab1Root: any = HomePage;
    tab2Root: any = AboutPage;
    tab3Root: any = ContactPage;

    constructor(userInfo: UserInfo, public nav: NavController) {
        if(!userInfo.getName()){
            nav.push(RegisterNamePage);
        }
    }
}

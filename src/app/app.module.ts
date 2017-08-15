import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {HttpClient} from '../share/http-client';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {ContactService} from "../providers/contact.service";
import {ShoppingListService} from "../providers/shopping-list.service";
import {UserService} from "../providers/user.service";
import {UserInfo} from "../providers/user-info";
import {HttpModule} from "@angular/http";
import {RegisterNamePage} from "../pages/register-name/register-name";

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        RegisterNamePage,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        RegisterNamePage,
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ShoppingListService, ContactService, UserService, UserInfo, HttpClient]
})
export class AppModule {
}

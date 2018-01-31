import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { TabsPage } from '../tabs/tabs';


@NgModule({
  declarations: [
    LoginPage,
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    TabsPage
  ],
})
export class LoginPageModule {}

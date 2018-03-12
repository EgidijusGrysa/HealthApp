import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../../data/user';
import { RegisterService } from '../../services/register';
import { MyApp } from '../../app/app.component';
import { App } from 'ionic-angular/components/app/app';
import { MainMenuPage } from '../main-menu/main-menu';
import { MainMenuTabsPage } from '../main-menu-tabs/main-menu-tabs';
import { TextToSpeech } from '@ionic-native/text-to-speech';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
regForm: FormGroup;

  constructor(private regService: RegisterService, private app: App, private tts: TextToSpeech){}

  SpeakText(text: string){
    this.tts.speak({
    text: text,
    locale: 'en-GB',
    rate: 0.77
})
.then(() => console.log("Success"))
.catch((err => console.log(err)));
}

  onSubmit(){
    const user = new User(this.regForm.value.email,this.regForm.value.password);
    this.regService.signIn(user)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('callories', data.callories);
       
      this.app.getRootNav().setRoot(MainMenuTabsPage);
      },
      error => console.log(error)
    );

  }

  ngOnInit(){
    this.regForm= new FormGroup({
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required, 
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])
      });
  }

}

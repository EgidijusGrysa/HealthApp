import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  regForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSubmit(){
    console.log(this.regForm);
  }
  ngOnInit(){
    this.regForm= new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
      age: new FormControl(null, [
        Validators.required
       
      ]),
      weight: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      favFood: new FormControl(null, Validators.required),
      disFood: new FormControl(null, Validators.required)
    });
  }

}

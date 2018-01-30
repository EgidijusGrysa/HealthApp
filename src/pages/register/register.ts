import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Validators } from '@angular/forms';
import { RegisterService } from '../../services/register';
import { User } from '../../data/user';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  regForm: FormGroup;

  constructor(private regService: RegisterService) {
  }

  onSubmit(){
    const user = new User(
      this.regForm.value.name,
      this.regForm.value.email,
      this.regForm.value.password,
      this.regForm.value.height,
      this.regForm.value.weight,
      this.regForm.value.age,
      this.regForm.value.disFood,
      this.regForm.value.disFood);

      this.regService.registerUser(user)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      //this.regForm.reset();
  }
  ngOnInit(){
    this.regForm= new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required, 
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
      age: new FormControl(null,Validators.required),
      weight: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      favFood: new FormControl(null, Validators.required),
      disFood: new FormControl(null, Validators.required)
    });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Validators } from '@angular/forms';
import { RegisterService } from '../../services/register';
import { User } from '../../data/user';
import { VoiceInputService } from '../../services/voiceInput';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Keyboard } from 'ionic-angular/platform/keyboard';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  voiceActive: any;
  regForm: FormGroup;
  name:string;
  pass: string
  email:string;
  age:string;
  weight:string;
  gender:string;

  constructor(private keyboard:Keyboard, private alertCntrl:AlertController,
    private regService: RegisterService,
    private voiceInput:VoiceInputService) {
    //console.log(this.voiceActive);
    this.voiceActive = false;
  }


  startVoiceInput(typeOfInput: string){
    
    switch(typeOfInput){
      case "name":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.regForm.patchValue({name: x});
        },
          err=>{
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "pass":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.pass = x;
        },
          err=>{
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "email":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.email = this.voiceInput.emailInput(x);
        },
          err=>{
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "age":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.age = x;
        },
          err=>{
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      case "weight":
      if(this.voiceActive){
        return this.voiceInput.startLisening().subscribe(x=>{
            this.weight = x;
        },
          err=>{
            console.log(err);
          },
          ()=>{
            //this.name = "got here";
            console.log("Sucessful");
          });
      }
      break;
      
    }
    
  }
  


  onSubmit(){

    const user = new User(
      this.regForm.value.email,
      this.regForm.value.password,
      this.regForm.value.name,
      this.regForm.value.gender,
      this.regForm.value.weight,
      this.regForm.value.age,
      this.calculateCallories(this.gender,this.regForm.value.age,this.regForm.value.weight));

      this.regService.registerUser(user)
      .subscribe(
        data => console.log(data),
        error => console.log(error),
        ()=>console.log("moved to new page")
      );
      //this.regForm.reset();
  }

  calculateCallories(gender: string,age: number, weight: number){
    if(gender == 'f'){
      if(age >= 60){
        return (10.5 * weight) + 596;
      }else if(age < 60){
        return (8.7* weight) + 829;
      }
    }else{
      if(age >= 60){
        return (13.5 * weight) + 487;
      }else if(age < 60){
        return (11.6* weight) + 879;
      }
    }
    
    return null;
  }

  ngOnInit(){
    this.regForm= new FormGroup({
      name: new FormControl(null,Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required, 
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
      age: new FormControl(null,Validators.required),
      weight: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required)
    });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { VoiceInputService } from '../../services/voiceInput';
import { SettingsService } from '../../services/settings';

/**
 * Generated class for the NutritionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nutrition',
  templateUrl: 'nutrition.html',
})
export class NutritionPage {
  vitaminB12: any;
  calcium: any;
  fibre:any;
  omega:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private mealPlanner: MealPlannerService,
    private tts: TextToSpeech,
    private voiceCntrl: VoiceInputService,
    private app: App,
    private settings: SettingsService) {
    this.vitaminB12 = 0;
  }

  voiceInputLisen_Background(){
    if(this.settings.isSpeechInput_ON()){
      this.voiceCntrl.startLisening_NoUI().subscribe(
        data=>{
            console.log("Words Spoke ====> " +data);
            this.checkResult(data);
      },
        err=>{
            console.log("Voicer Error: " + err);
            setTimeout(()=>{
                this.voiceInputLisen_Background();   
            },1000);
        });
    }
    
  }

  checkResult(input: string){
    if(input != ""){
      switch(input){
        case "back":
        this.app.getRootNav().getActiveChildNav().select(0);
        this.resetVoice_Lisener();
        break;
        case "logout":
        console.log("logged out");
        this.resetVoice_Lisener();
        default:
        console.log("No match found, input= " + input);
        break;
      }
    }else{
      console.log("input is null")
    }
  }

  resetVoice_Lisener(){
    setTimeout(()=>{
        this.voiceInputLisen_Background();   
    },1000);
}

  SpeakText(text: string, weightString?:string){
    if(this.settings.isSpeechOutput_ON()){
      let newText = text
    if(weightString != undefined){
      newText += weightString;
    }

        this.tts.speak({
        text: newText,
        locale: 'en-GB',
        rate: 0.80
    })
    .then(() => console.log("Success"))
    .catch((err => console.log(err)));
    }
    
}

  ionViewWillEnter(){
    let v12 = (this.mealPlanner.calcCalories("n",this.mealPlanner.breakfast,"418")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.lunch,"418")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.dinner,"418")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.eveSnack,"418")) ;
    this.vitaminB12 = v12.toFixed(1);

    let ca =(this.mealPlanner.calcCalories("n",this.mealPlanner.breakfast,"301")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.lunch,"301")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.dinner,"301")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.eveSnack,"301"));
    this.calcium = ca.toFixed(0);

    let f = (this.mealPlanner.calcCalories("n",this.mealPlanner.breakfast,"291")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.lunch,"291")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.dinner,"291")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.eveSnack,"291"));
    this.fibre = f.toFixed(1);

    let o = (this.mealPlanner.calcCalories("n",this.mealPlanner.breakfast,"646")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.lunch,"646")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.dinner,"646")
    +this.mealPlanner.calcCalories("n",this.mealPlanner.eveSnack,"646"));console.log("did enter nut page");
    this.omega = o.toFixed(1);

    //this.voiceInputLisen_Background();
  }

  

}

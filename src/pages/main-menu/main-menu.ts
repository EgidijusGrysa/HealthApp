import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';
import { Meal } from '../../data/meal';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FoodNutritionService } from '../../services/foodNutrition';
import { NutritionPage } from '../nutrition/nutrition';
import { VoiceInputService } from '../../services/voiceInput';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { HelperService } from '../../services/helperClass';
import { SettingsService } from '../../services/settings';




@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  totalCalories : number;
  breakfastMeal: string[];
  lunchMeal: string[];
  dinnerMeal: string[];
  eveMeal: string[];
  userID: string;
  userCalls: string;
  
  @ViewChild('nav') nav:NavController;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mealPlanner: MealPlannerService,
    private loadingCtrl: LoadingController,
    private foodNutrition: FoodNutritionService,
    private voiceCntrl: VoiceInputService,
    private tts: TextToSpeech,
    private helper: HelperService,
    private menu: MenuController,
    private app: App,
    private settings:SettingsService) {
    
      this.totalCalories = 0;
      
      this.breakfastMeal = [""];
      if(this.helper.cameFromRegister){ this.acceptFood(); }
      if(this.helper.cameFromLogin) { this.getMealForLoggedUser(); }
      this.acceptFood();
      this.userID = localStorage.getItem("userId");
      this.userCalls = localStorage.getItem("callories");
      
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menu.close();
  }


  SpeakText(text: string[]){
    console.log("Speech output: " + this.settings.isSpeechOutput_ON());
    if(this.settings.isSpeechOutput_ON()){
            let x = "";
        text.forEach(element => {
            x += element + " ,    ";
        });
        this.tts.speak({
            text: x,
            locale: 'en-GB',
            rate: 0.77
        })
        .then(() => console.log("Success"))
        .catch((err => console.log(err)));
    }
}
  

  voiceInputLisen_Background(){
    console.log("Speech input: " + this.settings.isSpeechInput_ON());
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

  ionViewWillEnter(){
      console.log("ENtered back to menu");
  }

  checkResult(speechItem:string){
      let arr;
      let first;
      let second;
      console.log("inside checkResult ===>" + speechItem)
    
      //checks if there is more then 1 word in a speechIitem
    if(this.voiceCntrl.hasTwoWords(speechItem)){
        console.log("Has 2 words");
        arr = speechItem.split(' ');
        first = arr[0];
        second = arr[1];
    }else{
        first = speechItem;
        console.log("has 1 word");
    }
    
    if(first != null){
        switch(first) {
            case "breakfast":
                if(second == "accept"){
                    console.log("accepted breakfast");
                    this.resetVoice_Lisener();
                }else if(second =="decline"){
                    this.changeMeal("b");
                    this.resetVoice_Lisener();
                }
            break;
            case "lunch":
                if(second == "accept"){
                    console.log("accepted lunch");
                    this.resetVoice_Lisener();
                }else if(second =="decline"){
                    this.changeMeal("l");
                    this.resetVoice_Lisener();
                }
            break;
            case "dinner":
                if(second == "accept"){
                    console.log("accepted dinner");
                    this.resetVoice_Lisener();
                }else if(second =="decline"){
                    this.changeMeal("d");
                    this.resetVoice_Lisener();
                }
            break;
            case "evening":
                if(second == "accept"){
                    console.log("accepted snack");
                    this.resetVoice_Lisener();
                }else if(second =="decline"){
                    this.changeMeal("e");
                    this.resetVoice_Lisener();
                }
            break;
            case "snack":
                if(second == "accept"){
                    console.log("accepted snack");
                    this.resetVoice_Lisener();
                }else if(second =="decline"){
                    this.changeMeal("e");
                    this.resetVoice_Lisener();
                }
            break;
            case "nutrients":
                console.log("went to nutrients")
                this.app.getRootNav().getActiveChildNav().select(1);
            break;
            case "nutrition":
            this.app.getRootNav().getActiveChildNav().select(1);
            break;
            default:
            console.log("No matches found try again");
            this.resetVoice_Lisener();
            break;
        }
    }  
}

    resetVoice_Lisener(){
        setTimeout(()=>{
            this.voiceInputLisen_Background();   
        },1000);
    }

  updateMeal(){
    var obj = new Object({
        userID: this.userID,
        dayMeal: new Object({
            date: Date.now(),
            breakfast: this.mealPlanner.breakfast,
            lunch: this.mealPlanner.lunch,
            dinner: this.mealPlanner.dinner,
            eveMeal: this.mealPlanner.eveSnack
        })
      });
      this.mealPlanner.updateMeals(this.userID, obj)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
            console.log(err);
        }
    )
  }

  //get the meal for the logged in user after loggin in
  getMealForLoggedUser(){
      let loader = this.loadingCtrl.create({
          content: 'Loading you meal plan...'
      });
      loader.present();
      this.mealPlanner.getCurrentMealForUser()
      .subscribe(data=>{
        this.mealPlanner.breakfast = data.dayMeals[0].breakfast;
        this.mealPlanner.lunch = data.dayMeals[0].lunch;
        this.mealPlanner.dinner = data.dayMeals[0].dinner;
        this.mealPlanner.eveSnack = data.dayMeals[0].eveMeal;
        console.log(data);
      },err=>{
        console.log(err);
      },
    ()=>{
        this.MealsToString();
        loader.dismiss();
    });
  }


//   post new meal
  mealPost(){
      var obj = new Object({
        userID: this.userID,
        dayMeal: new Object({
            date: Date.now(),
            breakfast: this.mealPlanner.breakfast,
            lunch: this.mealPlanner.lunch,
            dinner: this.mealPlanner.dinner,
            eveMeal: this.mealPlanner.eveSnack
        })
      });
      console.log(obj);
      this.mealPlanner.postMeal(obj)
      .subscribe(
          data => {
            console.log(data);
          },
          err => {
              console.log(err);
          }
      )
  }

  private _postMeal(meal: Meal) {
    this.mealPlanner.postMeal(meal)
    .subscribe(
      data=> {
          console.log(data);
      },
      err => console.log(err)
    );
  }
  postMeal(string:String){
      switch(string){
          case 'b':
          this._postMeal(this.mealPlanner.breakfast);
          break;
          case 'l':
         this._postMeal(this.mealPlanner.lunch);
          break;
          case 'd':
          this._postMeal(this.mealPlanner.dinner);
          break;
          case 'e':
          this._postMeal(this.mealPlanner.eveSnack);
          break;
      }
    }

    
    changeMeal(m: string){
    
    const loading = this.loadingCtrl.create({
      content: 'Updating new meal...'
    });
    
      switch(m){
          case "b":
          this.mealPlanner.breakfast = new Meal();
          this.mealPlanner.populateBreakfast();
            loading.present();
            let ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.breakfast);
            
            return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
               this.mealPlanner.breakfast = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.breakfast,item.foods);
            },
        err=>{
            console.log(err);
            loading.dismiss();
        },
    ()=>{
        this.totalCalories = this.mealPlanner.calc_Total_Callories();
        this.mealPlanner.breakfast.callories = this.mealPlanner.calcCalories(
            "c",
            this.mealPlanner.breakfast,
          "208");
          this.mealPlanner.calculateCalorie_Distrubution();
        this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
        loading.dismiss();
        
    });

    case "l":
    loading.present();
    this.mealPlanner.lunch = new Meal();
    this.mealPlanner.populateLunch();
    
      ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.lunch);
      return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
         this.mealPlanner.lunch = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.lunch,item.foods);
      },
  err=>{
      console.log(err);
      loading.dismiss();
  },
()=>{
    this.totalCalories = this.mealPlanner.calc_Total_Callories();
    this.mealPlanner.lunch.callories = this.mealPlanner.calcCalories(
        "c",
        this.mealPlanner.lunch,
      "208");
      this.mealPlanner.calculateCalorie_Distrubution();
  this.lunchMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.lunch);
  loading.dismiss();
  
});
    case "d":
    loading.present();
    this.mealPlanner.dinner = new Meal();
    this.mealPlanner.populateDiner();
    
      ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.dinner);
      return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
         this.mealPlanner.dinner = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.dinner,item.foods);
      },
  err=>{
      console.log(err);
      loading.dismiss();
  },
()=>{
    this.totalCalories = this.mealPlanner.calc_Total_Callories();
    this.mealPlanner.dinner.callories = this.mealPlanner.calcCalories(
        "c",
        this.mealPlanner.dinner,
      "208");
      this.mealPlanner.calculateCalorie_Distrubution();
  this.dinnerMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.dinner);
  loading.dismiss();
  
});
    case "e":
    loading.present();
    this.mealPlanner.eveSnack = new Meal();
    this.mealPlanner.populateEveSnack();
    
      ids = this.mealPlanner.mealPlanToString(true,this.mealPlanner.eveSnack);
      return this.foodNutrition.searchManyFood(ids).subscribe(item =>{
         this.mealPlanner.eveSnack = this.mealPlanner.getNutrientsForEachFood(this.mealPlanner.eveSnack,item.foods);
      },
  err=>{
      console.log(err);
      loading.dismiss();
  },
()=>{
    this.totalCalories = this.mealPlanner.calc_Total_Callories();
    this.mealPlanner.eveSnack.callories = this.mealPlanner.calcCalories(
        "c",
        this.mealPlanner.eveSnack,
      "208");
      this.mealPlanner.calculateCalorie_Distrubution();
  this.eveMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.eveSnack);
  loading.dismiss();
  
});    
          
      }
  }

  acceptFood(){
    const loading = this.loadingCtrl.create({
        content: 'Creating Meals....'
      });
  loading.present();
  let allMeals: Meal[] = [
      this.mealPlanner.breakfast,
      this.mealPlanner.lunch,
      this.mealPlanner.dinner,
      this.mealPlanner.eveSnack
  ];
  //console.log(allMeals);
  let ids: string[] = [];
  allMeals.forEach(meal=>{
      
      let id = this.mealPlanner.mealPlanToString(true,meal);
      ids = ids.concat(id);
  });
  //console.log("Nutrient IDS"+ids);
  return this.foodNutrition.searchManyFood(ids).subscribe(nutrients=>{
      this.mealPlanner.populateNutrition(nutrients.foods);
      console.log(nutrients.foods);
  },
  err => {
      console.log("Error has occured!! "+err);
      loading.dismiss();
  },
  ()=>{
      
      this.totalCalories = this.mealPlanner.calc_Total_Callories();
      this.mealPlanner.breakfast.callories = this.mealPlanner.calcCalories(
          "c",
          this.mealPlanner.breakfast,
        "208");
        this.mealPlanner.lunch.callories = this.mealPlanner.calcCalories(
            "c",
            this.mealPlanner.lunch,
          "208");
          this.mealPlanner.dinner.callories = this.mealPlanner.calcCalories(
            "c",
            this.mealPlanner.dinner,
          "208");
          this.mealPlanner.eveSnack.callories = this.mealPlanner.calcCalories(
            "c",
            this.mealPlanner.eveSnack,
          "208");
            this.mealPlanner.calculateCalorie_Distrubution();
      this.populateNutrient_Vars();
      
      console.log(this.totalCalories);
      this.MealsToString();    

      loading.dismiss();
      //this.voiceInputLisen_Background();
      this.mealPost();
  });
  }

  MealsToString(){
    this.breakfastMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.breakfast);
    this.lunchMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.lunch);
    this.dinnerMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.dinner);
    this.eveMeal = this.mealPlanner.mealPlanToString(false,this.mealPlanner.eveSnack);
  }

  populateNutrient_Vars(){
    // let x = this.mealPlanner.calcCalories(this.mealPlanner.breakfast,"418")
    // +this.mealPlanner.calcCalories(this.mealPlanner.lunch,"418")
    // +this.mealPlanner.calcCalories(this.mealPlanner.dinner,"418")
    // +this.mealPlanner.calcCalories(this.mealPlanner.eveSnack,"418");
    // console.log(x);
    // this.nutrientPage.vitaminB12 = x;
    // // this.navCtrl.push(NutritionPage,{
    // //     b12: x
    // // });
  }
}

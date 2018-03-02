import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private mealPlanner: MealPlannerService) {
    this.vitaminB12 = 0;
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
  }

  

}

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { MealPlannerService } from '../../services/mealPlanner';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { VoiceInputService } from '../../services/voiceInput';
import { SettingsService } from '../../services/settings';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

@IonicPage()
@Component({
  selector: 'page-nutrition',
  templateUrl: 'nutrition.html',
})
export class NutritionPage implements OnInit{
  //d3 stuff
  private width: number = 900;
  private height: number= 500;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private labelArc2: any;
  private pie: any;
  private color: any;
  private svg: any;

  vitaminB12: any;
  calcium: any;
  fibre:any;
  omega:any;
  
  calloryDistrubution: any[] = [
    {name:"Protein",calories:200},
    {name:"Carbohydrates",calories:400},
    {name:"Fats",calories:100}
  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private mealPlanner: MealPlannerService,
    private tts: TextToSpeech,
    private voiceCntrl: VoiceInputService,
    private app: App,
    private settings: SettingsService) {
    this.vitaminB12 = 0;
    this.radius = Math.min(this.width,this.height)/2;
  }

  ngOnInit(){
    console.log("Chart should be displayed");
    
  }

  private initSvg(){
    // colors for the chart
    this.color = d3Scale.scaleOrdinal().range(["#00FF00", "#ff1200", "#4195e5"]);
    //the size of the chart
    this.arc = d3Shape.arc().outerRadius(this.radius-20).innerRadius(0);
    //the radius of text inside the chart
    this.labelArc = d3Shape.arc()
    .outerRadius(this.radius - 50)
    .innerRadius(this.radius - 50);
    //data for the chart0
    this.pie = d3Shape.pie().sort(null).value((x:any)=>x.calories);

    this.labelArc2 = d3Shape.arc()
    .outerRadius(this.radius - 100)
    .innerRadius(this.radius - 100);
    //data for the chart
    this.pie = d3Shape.pie().sort(null).value((x:any)=>x.calories);

    //set size for svg
    this.svg = d3.select("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox','0 0 '+Math.min(this.width,this.height)+' '+Math.min(this.width,this.height))
            .append("g")
            .attr("transform", "translate(" + Math.min(this.width,this.height) / 2 + "," + Math.min(this.width,this.height) / 2 + ")");
  

  }

  private drawPieChart(){
    let g = this.svg.selectAll(".arc")
    .data(this.pie(this.calloryDistrubution))
    .enter().append("g")
    .attr("class",this.arc);
    g.append("path").attr("d",this.arc).style("fill",(x:any)=>this.color(x.data.name));

    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
                    .attr("dy", ".100em")
                    .attr("font-size","25").text((d: any) => d.data.name);
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc2.centroid(d) + ")")
                    .attr("dy", ".40em")
                    .attr("font-size","20").text((d: any) => d.data.perc);

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
            // setTimeout(()=>{
            //     this.voiceInputLisen_Background();   
            // },1000);
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

    this.calloryDistrubution = [
      {
        name:"Protein",
        perc: this.mealPlanner.getPercentageDistrubution_Calories(this.mealPlanner.getProteinCalories()),
        calories:this.mealPlanner.getProteinCalories()
      },
      {
        name:"Carbohydrates",
      perc: this.mealPlanner.getPercentageDistrubution_Calories(this.mealPlanner.getCarbsCalories()),
      calories:this.mealPlanner.getCarbsCalories()
    },
      {
        name:"Fats",
        perc: this.mealPlanner.getPercentageDistrubution_Calories(this.mealPlanner.getFatCalories()),
        calories:this.mealPlanner.getFatCalories()
      }];
    
    console.log(this.calloryDistrubution);
    this.initSvg();
    this.drawPieChart();
  

    this.voiceInputLisen_Background();
  }

  
}

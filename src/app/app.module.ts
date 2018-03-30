import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { HttpModule } from '@angular/http';
import { RegisterService } from '../services/register';
import { FoodNutritionService } from '../services/foodNutrition';
import { RegisterPage } from '../pages/register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { MainMenuTabsPage } from '../pages/main-menu-tabs/main-menu-tabs';
import { NutritionPage } from '../pages/nutrition/nutrition';
import { MealPlannerService } from '../services/mealPlanner';
import { VoiceInputService } from '../services/voiceInput';
import { PopUpWindowService } from '../services/popUpWindows';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { HelperService } from '../services/helperClass';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainMenuPage,
    RegisterPage,
    LoginPage,
    TabsPage,
    MainMenuTabsPage,
    NutritionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainMenuPage,
    RegisterPage,
    LoginPage,
    TabsPage,
    MainMenuTabsPage,
    NutritionPage
  ],
  providers: [
    StatusBar,
    SpeechRecognition,
    TextToSpeech,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterService,
    FoodNutritionService,
    MealPlannerService,
    VoiceInputService,
    PopUpWindowService,
    HelperService
  ]
})
export class AppModule {}

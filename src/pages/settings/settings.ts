import { Component } from '@angular/core';
import { IonicPage, Toggle } from 'ionic-angular';
import { SettingsService } from '../../services/settings';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private settings: SettingsService) {
  }


  toggleSpeechInput(toggle: Toggle){
    this.settings.setSpeechInput(toggle.checked);
  }

  toggleSpeechOutput(toggle:Toggle){
    this.settings.setSpeechOutput(toggle.checked);
  }

  checkInput(){
    return this.settings.isSpeechInput_ON();
  }

  checkOutput(){
    return this.settings.isSpeechOutput_ON();
  }
  

}

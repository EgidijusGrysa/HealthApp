import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/**
 * Generated class for the SpeechToTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'speech-to-text',
  templateUrl: 'speech-to-text.html'
})
export class SpeechToTextComponent {



  constructor(private speechRecognition: SpeechRecognition) {
    
  }



}

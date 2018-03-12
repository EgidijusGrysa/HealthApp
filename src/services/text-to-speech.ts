import { Injectable } from "@angular/core";
import { TextToSpeech } from '@ionic-native/text-to-speech';
@Injectable()
export class TextToSpeechService{

    constructor(private tts: TextToSpeech){

    }

    SpeakText(text: string){
        this.tts.speak(text)
        .then(() => console.log("Success"))
        .catch((err => console.log(err)));
    }
}
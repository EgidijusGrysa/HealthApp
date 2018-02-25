import { Injectable } from "@angular/core";
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VoiceInputService{
    speechList: Array<string> = [];
    userInput:string;
    constructor(private speech:SpeechRecognition,private alertCntrl:AlertController){

    }

    isSpeechAvailable():Promise<boolean>{
        return this.speech.isRecognitionAvailable();    
    }

    startLisening(){
        if(this.isSpeechAvailable){
           return this.speech.startListening().map(data=>{
                return data[0];
            },
            err => {
                console.log(err);
            });
        }
        
    }  

    
}
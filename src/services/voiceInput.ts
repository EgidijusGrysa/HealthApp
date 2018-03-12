import { Injectable } from "@angular/core";
import { SpeechRecognition, SpeechRecognitionListeningOptions } from "@ionic-native/speech-recognition";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VoiceInputService{
    speechList: Array<string> = [];
    userInput:string[] = ["App nutrients","App main menu","decline breakfast"];
    option: SpeechRecognitionListeningOptions;
    showPopup: boolean;
    constructor(private speech:SpeechRecognition,private alertCntrl:AlertController){
        
        this.option = {
            showPopup:false
        };
    }

    isSpeechAvailable():Promise<boolean>{
        return this.speech.isRecognitionAvailable();    
    }

    findMatch(string:string,arr:string[]){
        let x = "";
        arr.forEach(element => {
                if(element.includes(string)){
                    x = element;
                    
                }
            });
        return x;
    }

    startLisening_NoUI(){
        if(this.isSpeechAvailable){
            return this.speech.startListening(this.option).map(data=>{
                 return data[0];
             },
             err => {
                 console.log(err);
             });
         }
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
    //deletes white spaces and returns the new string
    deleteWhiteSpace(s: string){
        return s.replace(/\s/g,"");
    }
    
    //deletes white spaces and chnaged 'at' to @ and makes lowercase
    emailInput(eString: string){
        let emailInput = eString.replace(/\s/g,"");
        console.log(emailInput);
        emailInput = emailInput.replace("at","@");
        emailInput = emailInput.toLowerCase();
        return emailInput;
    }

    
}
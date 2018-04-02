import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService{
    private speechInput_ON: boolean = true;
    private speechOutput_ON: boolean = true;

    setSpeechInput(isOn:boolean){
        this.speechInput_ON = isOn;
    }

    setSpeechOutput(isOn: boolean){
        this.speechOutput_ON = isOn;
    }

    isSpeechInput_ON(){
        return this.speechInput_ON;
    }

    isSpeechOutput_ON(){
        return this. speechOutput_ON;
    }
    
}
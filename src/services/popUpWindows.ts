import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class PopUpWindowService{

    constructor(private toastCtrl: ToastController){

    }

    createToastWithClose(message: string,pos: string){
        let toast = this.toastCtrl.create({
            message: message,
            position: pos,
            showCloseButton: true,
            dismissOnPageChange: true,
            closeButtonText: 'Close'
        });

        toast.present();
    }

    createToastTimer(message: string,pos:string,duration: number){
        let toast = this.toastCtrl.create({
            message: message,
            position:pos,
            duration:duration
        });

        toast.present();
    }
}
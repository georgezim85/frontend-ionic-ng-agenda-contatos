import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: "root"
})
export class ShowToastService {
    toast: HTMLIonToastElement;
    constructor(private toastCtrl: ToastController,
    ) { }

    async showToast(message: string, color: 'primary'|'secondary'|'tertiary'|'success'|'warning'|'danger'|'light'|'medium'|'dark'): Promise<void> {
        const toast: HTMLIonToastElement = await this.toastCtrl.create({
            message,
            duration: 3000,
            position: 'bottom',
            color
        });
        toast.present();
    }
}
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

enum AlertTypes {
    DANGER = 'danger',
    SUCCESS = 'success'
}

@Injectable({
    providedIn: 'root'
})
export class AlertModalService {


    constructor(private modaService: BsModalService) { }

    // tslint:disable-next-line:typedef
    private showAlert(message: string, type: string){
        const bsModalRef: BsModalRef = this.modaService.show(AlertModalComponent);
        bsModalRef.content.type = type;
        bsModalRef.content.type = message;
    }

    // tslint:disable-next-line:typedef
    showAlertSuccess(message: string){
        this.showAlert(message, AlertTypes.SUCCESS);
    }

}

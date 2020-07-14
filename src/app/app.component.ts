import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModalService } from './alert-modal.service';
import { AppComponentService } from './app.component.service';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngFileUpload';

  files: Set<File>;
  progress = 0;
  bsModalRef: BsModalRef;
  constructor(
    private service: AppComponentService,
    private modal: AlertModalService,
    private modalService: BsModalService
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  onChange(event: { srcElement: { files: FileList; }; }) {
    console.log(event);

    const selectFiles = event.srcElement.files as FileList;

    const filesName = [];
    this.files = new Set();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < selectFiles.length; i++) {
      filesName.push(selectFiles[i].name);
      this.files.add(selectFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = filesName.join(', ');
    this.progress = 0;
  }

  // tslint:disable-next-line:typedef
  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:8000/upload')
        // tslint:disable-next-line:ban-types
        .subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          console.log(event);
          if (event.type === HttpEventType.Response) {
            this.modal.showAlertSuccess('Imagem carregada com sucesso');
            console.log('upload finalizado');
          }
          else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso', percentDone);

            this.progress = percentDone;
          }
        });
    }

  }

  // tslint:disable-next-line:typedef
  handleSuccess() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'success';
    this.bsModalRef.content.message = 'Imagem Carragada com sucesso!!!';
  }
}

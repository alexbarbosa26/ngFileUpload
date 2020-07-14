import { AppComponentService } from './app.component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngFileUpload';

  files: Set<File>;
  constructor(private service: AppComponentService) { }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event)

    const selectFiles = <FileList>event.srcElement.files;

    //document.getElementById('customFileLabel').innerHTML = selectFiles[0].name;

    const filesName = [];
    this.files = new Set();
    for (let i = 0; i < selectFiles.length; i++) {
      filesName.push(selectFiles[i].name);
      this.files.add(selectFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = filesName.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:8000/upload')
      .subscribe(response => console.log('upload concluido'))
    }

  }
}

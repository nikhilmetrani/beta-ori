import { Component } from '@angular/core';

@Component({
  selector: 'bo-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'api/0/upload'
  };

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}

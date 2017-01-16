import { Component, Input, OnInit, NgZone, EventEmitter } from '@angular/core';
import {DeveloperApplicationsService} from '../../../core';
@Component({
  selector: 'bo-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() allowedExtensions = undefined;
  @Input() uploadURL: string;
  @Input() appId: string;
  imageURL: string = '';
  imageData: any;
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  uploadEvents: EventEmitter<any> = new EventEmitter();
  zone: NgZone;
  extendedoptions: Object;
  responses: any[] = [];
  progress: number = 0;
  response: any;
  previewData: any;

  constructor(private devAppsService: DeveloperApplicationsService) { }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    // let filterExts: boolean = this.allowedExtensions !== undefined;
    this.extendedoptions = {
      calculateSpeed: true,
      filterExtensions: true,
      allowedExtensions: ['image/png', 'image/jpg'],
      autoUpload: false,
      previewUrl: true,
      url: this.uploadURL,
      customHeaders: {
          'x-auth-token': localStorage.getItem('jwt')
        }
    };
    this.imageURL = '/api/0/developer/applications/' + this.appId + '/image';
    this.devAppsService.getApplicationLogo(this.appId).subscribe(image => {
      console.log(image);
      this.imageData = image;
      console.log(this.imageData);
    });
  }

  handleUpload(data): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent / 100);
    });
  }

  handleMultipleUpload(data: any): void {
    let index = this.response.findIndex(x => x.id === data.id);
    if (index === -1) {
      this.responses[1].push(data);
    } else {
      let total = 0, uploaded = 0;
      this.response.forEach(resp => {
        total += resp.progress.total;
        uploaded += resp.progress.loaded;
      });
      let percent = uploaded / (total / 100) / 100;

      this.zone.run(() => {
        this.response[index] = data;
        this.progress = percent;
      });
    }
}

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  handlePreviewData(data: any): void {
    this.previewData = data;
  }

  startUpload() {
    this.uploadEvents.emit('startUpload');
  }
}

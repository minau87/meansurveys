// Provides a functionality for uploading a profile picture
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit, OnChanges {

  @ViewChild('fileInputField') fileInputField;

  @Input() allowedFileTypes: Array<String>;
  @Output() fileNotAllowed = new EventEmitter<boolean>();
  @Output() fileUpload = new EventEmitter<String>();
  @Output() fileTooBig = new EventEmitter<Number>();
  @Input() uploadProgress: Number;
  @Input() maxFileSize: Number;

  fileTypeAllowed: Boolean;
  fileName: String;
  imageBase64: String;

  constructor() { }

  ngOnInit() {
    if (!this.allowedFileTypes) {
      this.allowedFileTypes = [];
    }
    if (!this.maxFileSize) {
      this.maxFileSize = 0.300;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.uploadProgress.currentValue === 100) {
      this.uploadProgress = undefined;
    }
  }

  onChooseFile($event) {
    // If the user cancels the file selection, there are no files, therefore simply return
    if (!this.fileInputField.nativeElement.files[0]) {
      return;
    }
    // If the file is bigger than the allowed file size
    if (this.fileInputField.nativeElement.files[0].size) {
      // Get the file size in MB
      let fileSize = Math.round((this.fileInputField.nativeElement.files[0].size / 1024 / 1024) * 100) / 100;
      // Check if the file is bigger than the maximum allowed size
      if (fileSize > this.maxFileSize) {
        // If so, simply return and emit an event
        this.fileTooBig.emit(fileSize);
        return;
      }
    }

    // Check wether or not the type of the selected file is allowed or not
    if (!this.isFileTypeAllowed()) {
      this.fileNotAllowed.emit(true);
      return;
    }
    this.readFile();
  }

  // Emits the choosen picture as a base64 encoded string
  onFileUpload() {
    // If no image is set, return
    if (!this.imageBase64) {
      return;
    }
    // Emit file upload event with the image data and reset fields
    this.fileUpload.emit(this.imageBase64);
    this.fileName = undefined;
    this.imageBase64 = undefined;
  }

  // Checks wether or not the tpye of the selected file is allowed or not
  isFileTypeAllowed() {
    // If the array has a length of zero, all types are allowed, therefore return true
    if (this.allowedFileTypes.length === 0) {
      return true;
    }

    // Get the file name, then the file extension and then it's index in the array of allowed types
    const fileName: String = this.fileInputField.nativeElement.files[0].name;
    const fileExt = fileName.split('.').pop();
    const fileExtIndex = this.allowedFileTypes.indexOf(fileExt);

    if (fileExtIndex !== -1) {
      // file type is allowed, therefore set as filename which is displayed in the template
      this.fileName = fileName;
      // file type is in the allowed file types provided as inputs, therefore return true
      return true;
    } else {
      // file type is not in the allowed file types provided as inputs, therefore return false
      return false;
    }
  }

  // Reads a file as base64
  readFile(file?: any) {
    const f = file || this.fileInputField.nativeElement.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.imageBase64 = event.target.result;
    }, false);
    reader.readAsDataURL(f);
  }

}

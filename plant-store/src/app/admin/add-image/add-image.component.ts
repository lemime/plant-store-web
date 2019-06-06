import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { take, delay } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {
  constructor(private svc: FileUploadService) {
    this.reset();
  }
  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'file';

  file: File;
  items = Object.keys(Categories);
  selectedCategory = this.items[0];

  uploadForm = new FormGroup({
    image: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl(0),
    category: new FormControl(this.items[0]),
    description: new FormControl([''], Validators.required)
  });

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

  ngOnInit() {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('price', this.uploadForm.get('price').value);
    formData.append('category', this.uploadForm.get('category').value);
    formData.append('description', this.uploadForm.get('description').value);
    this.save(formData);
  }

  filesChange(files: FileList) {
    const fileToUpload = files.item(0);
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.save(formData);
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  save(formData: FormData) {
    this.currentStatus = this.STATUS_SAVING;
    this.svc
      .upload(formData)
      .pipe(
        take(1),
        delay(1500)
      )
      .subscribe(
        x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = this.STATUS_SUCCESS;
        },
        err => {
          this.uploadError = err;
          this.currentStatus = this.STATUS_FAILED;
        }
      );
  }
}

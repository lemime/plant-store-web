import { Component, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/categories';
import { AppService } from 'src/app/app.service';
import { Plant } from 'src/app/models/plant.model';
import { take, delay } from 'rxjs/operators';
import { FileUploadService } from 'src/app/admin/file-upload.service';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.scss']
})
export class EditPlantComponent {
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private service: AppService,
    private svc: FileUploadService
  ) {}

  plantImage = '';
  changeImage = false;
  file: File;

  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'file';

  items = Object.keys(Categories);
  plant: Plant;

  editForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', Validators.required),
    price: new FormControl(0),
    category: new FormControl(this.items[0]),
    description: new FormControl([''], Validators.required)
  });
  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

  toggle() {
    this.changeImage = !this.changeImage;
  }

  change() {
    console.log(this.editForm.value);
    if (this.changeImage) {
      this.onSubmit();
    } else {
      this.service
        .editPlant({ _id: this.plant._id, ...this.editForm.value })
        .subscribe();
    }
    this.ngxSmartModalService.closeLatestModal();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('_id', this.plant._id);
    formData.append('name', this.editForm.get('name').value);
    formData.append('price', this.editForm.get('price').value);
    formData.append('category', this.editForm.get('category').value);
    formData.append('description', this.editForm.get('description').value);
    this.save(formData);
  }

  save(formData: FormData) {
    this.currentStatus = this.STATUS_SAVING;
    this.svc
      .change(formData)
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

  open() {
    this.plant = this.ngxSmartModalService.getModalData('plant');
    this.plantImage = this.plant.image;
    this.editForm.controls.name.setValue(this.plant.name);
    this.editForm.controls.price.setValue(this.plant.price);
    this.editForm.controls.category.setValue(this.plant.category);
    this.editForm.controls.description.setValue(this.plant.description);
  }
}

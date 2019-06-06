import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  constructor(
    public service: AppService,
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  user: any;

  editForm = new FormGroup({
    username: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  onChange() {
    this.service.editUser(this.user._id, this.editForm.value).subscribe();
    this.ngxSmartModalService.closeLatestModal();
  }

  open() {
    this.user = this.ngxSmartModalService.getModalData('user');
    this.editForm.controls.username.setValue(this.user.username);
    this.editForm.controls.role.setValue(this.user.role);
  }
}

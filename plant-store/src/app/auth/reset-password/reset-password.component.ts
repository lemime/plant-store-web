import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private service: AppService) {}

  resetForm = new FormGroup({
    username: new FormControl(''),
    activationCode: new FormControl(''),
    newPassword: new FormControl('')
  });

  onSubmit() {
    this.service.reset(this.resetForm.value).subscribe();
  }
}

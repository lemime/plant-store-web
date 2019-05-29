import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-init',
  templateUrl: './reset-init.component.html',
  styleUrls: ['./reset-init.component.scss']
})
export class ResetInitComponent {
  constructor(private service: AppService) {}

  resetForm = new FormGroup({
    username: new FormControl('')
  });

  onSubmit() {
    this.service.initReset(this.resetForm.value).subscribe();
  }
}

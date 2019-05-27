import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent {
  constructor(private service: AppService) {}

  activateForm = new FormGroup({
    username: new FormControl(''),
    activationCode: new FormControl('')
  });

  onSubmit() {
    console.log(this.activateForm.value);
    this.service.activate(this.activateForm.value).subscribe();
  }
}

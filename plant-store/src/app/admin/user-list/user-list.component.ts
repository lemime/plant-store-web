import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  constructor(
    private service: AppService,
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  users: Observable<User[]>;

  ngOnInit() {
    this.users = this.service.getUsers();
    this.users.subscribe();
  }

  onDelete(userId: string) {
    this.service.deleteUser(userId).subscribe(() => {
      this.ngOnInit();
    });
  }

  onEdit(user: User) {
    this.ngxSmartModalService.resetModalData('user');
    this.ngxSmartModalService.setModalData(user, 'user');
    this.ngxSmartModalService.getModal('user').open();
    this.ngxSmartModalService
      .getModal('user')
      .onClose.subscribe(() => this.ngOnInit());
  }

  onDeleteOrder(id: string) {
    this.service.deleteOrder(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}

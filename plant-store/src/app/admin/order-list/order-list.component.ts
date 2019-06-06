import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  @Input()
  orders: Order[];

  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  onDelete(order: Order) {
    this.delete.emit(order._id);
  }
}

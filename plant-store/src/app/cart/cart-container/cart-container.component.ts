import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/models/product.model';
import { Plant } from 'src/app/models/plant.model';
import { Order } from 'src/app/models/order.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-container',
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss']
})
export class CartContainerComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) {}
  order: Product[];
  orders: Observable<Order[]>;

  isEmpty(): boolean {
    return this.order.length === 0 ? true : false;
  }

  saveOrder(): void {
    this.appService.saveOrder().subscribe(() => {
      this.ngOnInit();
    });
  }

  addToCart(plant: Plant): void {
    this.appService.addToCart(1, plant);
    this.order = this.appService.order;
  }

  delete(product: Product): void {
    this.appService.deleteFromCart(product);
    this.order = this.appService.order;
  }

  ngOnInit() {
    this.order = this.appService.order;
    this.orders = this.appService.getOrders();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './models/plant.model';
import {
  Credentials,
  RegisterCredentials,
  ActivationCredentials,
  UserAuth,
  ResetCredentials
} from './models/credentrials.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Product } from './models/product.model';
import { Order } from './models/order.model';

@Injectable()
export class AppService {
  static readonly TOKEN_STORAGE_KEY = 'token';
  static readonly ROLE_STORAGE_KEY = 'role';

  orders: Order[] = [];
  order: Product[] = [];

  addToCart(count: number, plant: Plant): void {
    const index = this.order
      .map(product => product.plant.name)
      .indexOf(plant.name);
    if (index !== -1) {
      this.order[index].count++;
    } else {
      this.order.push(new Product(count, plant));
    }
  }

  deleteFromCart(product: Product): void {
    console.log(product);
    const index = this.order
      .map(prod => prod.plant.name)
      .indexOf(product.plant.name);
    console.log(index);
    if (index !== -1) {
      this.order.splice(index, 1);
    }
  }

  saveOrder(): Observable<void> {
    const url = 'order/create';
    return this.http.post<void>(url, { products: this.order });
  }

  getOrders(): Observable<Order[]> {
    const url = 'orders';
    return this.http.get<Order[]>(url);
  }

  constructor(private http: HttpClient, private router: Router) {}

  public isLoggedIn(): boolean {
    return localStorage.getItem(AppService.TOKEN_STORAGE_KEY) ? true : false;
  }

  private saveToken(token: string): void {
    localStorage.setItem(AppService.TOKEN_STORAGE_KEY, token);
  }

  private saveRole(role: string): void {
    localStorage.setItem(AppService.ROLE_STORAGE_KEY, role);
  }

  public getToken(): string {
    return localStorage.getItem(AppService.TOKEN_STORAGE_KEY);
  }

  login(credentials: Credentials): Observable<UserAuth> {
    const url = 'login';
    return this.http.post<UserAuth>(url, credentials).pipe(
      tap(
        data => {
          this.saveToken(data.token);
          this.saveRole(data.role);
          this.router.navigate(['/']);
        },
        error => console.log(error)
      )
    );
  }

  logout(): void {
    localStorage.removeItem(AppService.TOKEN_STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  register(credentials: RegisterCredentials): Observable<void> {
    const url = 'register';
    return this.http
      .post<void>(url, credentials)
      .pipe(
        tap(
          () => this.router.navigate(['/activate']),
          error => console.log(error)
        )
      );
  }

  initReset(email: string) {
    const url = 'initreset';
    return this.http
      .post<void>(url, email)
      .pipe(
        tap(
          () => this.router.navigate(['/reset2']),
          error => console.log(error)
        )
      );
  }

  reset(credentials: ResetCredentials): Observable<UserAuth> {
    const url = 'reset';
    return this.http.post<UserAuth>(url, credentials).pipe(
      tap(
        data => {
          this.router.navigate(['/']),
            this.saveToken(data.token),
            this.saveRole(data.role);
        },
        error => console.log(error)
      )
    );
  }

  getPlantsList(): Observable<Plant[]> {
    const url = 'plants';
    return this.http.get<Plant[]>(url);
  }

  activate(credentials: ActivationCredentials): Observable<UserAuth> {
    const url = 'activate';
    return this.http.post<UserAuth>(url, credentials).pipe(
      tap(
        data => {
          this.router.navigate(['/']),
            this.saveToken(data.token),
            this.saveRole(data.role);
        },
        error => console.log(error)
      )
    );
  }
}

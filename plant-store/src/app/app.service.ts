import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './models/plant.model';
import {
  Credentials,
  RegisterCredentials,
  ActivationCredentials,
  UserAuth
} from './models/credentrials.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppService {
  static readonly TOKEN_STORAGE_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  public isLoggedIn(): boolean {
    return localStorage.getItem(AppService.TOKEN_STORAGE_KEY) ? true : false;
  }

  private saveToken(token: string): void {
    localStorage.setItem(AppService.TOKEN_STORAGE_KEY, token);
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

  getPlantsList(): Observable<Plant[]> {
    const url = 'plants';
    return this.http.get<Plant[]>(url);
  }

  activate(credentials: ActivationCredentials): Observable<UserAuth> {
    const url = 'activate';
    return this.http.post<UserAuth>(url, credentials).pipe(
      tap(
        data => {
          this.router.navigate(['/']), this.saveToken(data.token);
        },
        error => console.log(error)
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './models/plant.model';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  getPlantsList(): Observable<Plant[]> {
    const url = `plants`;

    return this.http.get<Plant[]>(url);
  }
}

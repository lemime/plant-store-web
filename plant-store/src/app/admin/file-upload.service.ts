import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export class Item {
  id: string;
}

@Injectable()
export class FileUploadService {
  constructor(private http: HttpClient) {}

  upload(formData) {
    const url = `photos/upload`;
    return this.http.post(url, formData).pipe(
      map((item: Item) => {
        return Object.assign({}, item, {
          url: `plants/images/${item.id}`
        });
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Oem {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  uploadExcel(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/upload-oem`,
      formData
    );
  }

  
  getOems(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/oems`
    );
  }
}

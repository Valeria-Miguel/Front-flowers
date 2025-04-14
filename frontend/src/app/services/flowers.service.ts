import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Flower } from '../models/flower.model';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://127.0.0.1:8000/api/flowers/';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    if (!token) {
      this.authService.logout();
      throw new Error('No authentication token available');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(`${this.apiUrl}list`, { headers: this.getHeaders() });
  }

  createFlower(flower: Flower): Observable<Flower> {
    return this.http.post<Flower>(`${this.apiUrl}create/`, flower, { headers: this.getHeaders() });
  }

  updateFlower(id: number, flower: Flower): Observable<Flower> {
    return this.http.put<Flower>(`${this.apiUrl}update/${id}/`, flower, { headers: this.getHeaders() });
  }

  deleteFlower(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${id}/`, { headers: this.getHeaders() });
  }
}
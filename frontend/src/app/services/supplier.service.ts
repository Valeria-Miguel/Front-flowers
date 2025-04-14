import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://127.0.0.1:8000/api/suppliers/';

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

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getSupplier(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}${id}`, { headers: this.getHeaders() });
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, supplier, { headers: this.getHeaders() });
  }

  updateSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}${id}`, supplier, { headers: this.getHeaders() });
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`, { headers: this.getHeaders() });
  }
}
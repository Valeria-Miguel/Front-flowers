import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://127.0.0.1:8000/api/orders/';

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

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  createOrder(order: Order): Observable<Order> {
    const payload = {
      delivery_address: order.delivery_address,
      delivery_date: order.delivery_date,
      notes: order.notes || '',
      items: order.items.map(item => ({
        flower: item.flower,
        quantity: item.quantity
      }))
    };
    console.log('Enviando payload a POST /api/orders/', payload);
    return this.http.post<Order>(this.apiUrl, payload, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error en POST /api/orders/', error);
        return throwError(() => new Error(error.message || 'Failed to create order'));
      })
    );
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}${id}/`, order, { headers: this.getHeaders() });
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  updateOrderState(id: number, state: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}${id}/state/`, { current_state: state }, { headers: this.getHeaders() });
  }
}
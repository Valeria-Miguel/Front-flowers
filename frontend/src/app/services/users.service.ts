import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://127.0.0.1:10000/api/users/';

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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users/`, { headers: this.getHeaders() });
  }

  
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}register/`, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: User): Observable<User> {
    const payload = {
      ...user,
      update_role: user.role
    };
    return this.http.put<User>(`${this.apiUrl}users/${id}/`, payload, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}users/${id}/`, { headers: this.getHeaders() });
  }
}
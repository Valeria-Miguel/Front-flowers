import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:10000/api/';
  private userSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    // sincronizada con localStorage
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.userSubject.asObservable();
    
    // Cargar tokens 
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  public get currentUserValue() {
    return this.userSubject.value;
  }

  login(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/token/`, { username, email, password }).pipe(
      tap(response => {
        if (!response?.access || !response?.refresh) {
          throw new Error('La respuesta no contiene tokens válidos');
        }
  
        this.accessToken = response.access;
        this.refreshToken = response.refresh;
        
        localStorage.setItem('access_token', this.accessToken as string);
        localStorage.setItem('refresh_token', this.refreshToken as string);
        
        const user = { username, email };
        localStorage.setItem('user', JSON.stringify(user));
        
        this.userSubject.next(user);
        
        this.router.navigate(['/dashboard']).catch(err => {
          console.error('Error en redirección:', err);
        });
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  initializeAuthState(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        this.accessToken = token;
        this.userSubject.next(JSON.parse(user));
        resolve(true);
      } else {
        this.userSubject.next(null);
        resolve(false);
      }
    });
  }

  refreshAccessToken(): Observable<any> {
    if (!this.refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    
    return this.http.post<any>(`${this.apiUrl}token/refresh/`, { refresh: this.refreshToken }).pipe(
      tap(response => {
        this.accessToken = response.access;
        if (this.accessToken) {
          localStorage.setItem('access_token', this.accessToken);
        }
      }),
      catchError(error => {
        console.error('Error refreshing token:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.userSubject.next(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}
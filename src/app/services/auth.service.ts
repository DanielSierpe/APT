import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`; // Ajusta esto según tu configuración

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        if (response && response.user) {
          this.setCurrentUser(response.user);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  checkEmailAvailability(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/check-email`, { email });
  }

  checkRutAvailability(rut: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/check-rut`, { rut });
  }

  async getUserRole(): Promise<number> {
    return new Promise((resolve) => {
      const userString = localStorage.getItem('currentUser');
      if (userString) {
        const user = JSON.parse(userString);
        console.log('Usuario actual:', user);
        if (user && user.role_id) {
          console.log('Rol del usuario:', user.role_id);
          resolve(user.role_id);
        } else {
          console.log('No se pudo determinar el rol');
          resolve(0);
        }
      } else {
        console.log('No hay usuario autenticado');
        resolve(0);
      }
    });
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.clearCurrentUser();
  }
}
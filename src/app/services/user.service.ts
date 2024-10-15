import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Esta es la ruta correcta

  constructor(private http: HttpClient) { }

  getUsers(): Observable<{ count: number; users: User[] }> {
    return this.http.get<{ count: number; users: User[] }>(`${this.apiUrl}/users`);
  }

  // Otros métodos si los necesitas
}

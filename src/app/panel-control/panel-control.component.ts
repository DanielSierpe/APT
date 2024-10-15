import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss']
})
export class PanelControlComponent implements OnInit {
  users: User[] = [];
  totalUsers: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:3000/api/users', { headers }).subscribe(
      (response: any) => {
        console.log('Respuesta completa:', response);
        if (Array.isArray(response)) {
          this.users = response;
          this.totalUsers = response.length;
        } else if (response && response.users && Array.isArray(response.users)) {
          this.users = response.users;
          this.totalUsers = response.count || response.users.length;
        } else {
          console.error('Formato de respuesta inesperado:', response);
          this.users = [];
          this.totalUsers = 0;
        }
        console.log('Usuarios cargados:', this.users);
        console.log('Total de usuarios:', this.totalUsers);
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  editUser(user: User) {
    console.log('Editar usuario:', user);
    // Implementa la lógica de edición aquí
  }

  deleteUser(user: User) {
    console.log('Eliminar usuario:', user);
    // Implementa la lógica de eliminación aquí
  }
}

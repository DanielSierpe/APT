import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LayoutComponent } from '../layout/layout.component';
import { register } from 'swiper/element/bundle';

register(); // Registra los elementos de Swiper

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userRole: number | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserRole();
  }

  async getUserRole() {
    try {
      this.userRole = await this.authService.getUserRole();
      console.log('Rol del usuario en el componente:', this.userRole);
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      this.userRole = 0;
    }
  }
}

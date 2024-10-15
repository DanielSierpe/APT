import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() pageTitle: string = '';
  userRole: number | undefined;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.getUserRole();
  }

  async getUserRole() {
    try {
      this.userRole = await this.authService.getUserRole();
      console.log('User role:', this.userRole);
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      this.userRole = 0;
    }
  }
}

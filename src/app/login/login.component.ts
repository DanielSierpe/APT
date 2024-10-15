import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.token);
        
        // Guardar la información del usuario
        if (response.user) {
          this.authService.setCurrentUser(response.user);
        }
        
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error en el login', error);
        if (error.error && error.error.message) {
          this.error = error.error.message;
        } else {
          this.error = 'Ocurrió un error durante el inicio de sesión. Por favor, intenta de nuevo.';
        }
      }
    });
  }
}

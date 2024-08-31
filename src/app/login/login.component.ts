import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  iniciarSesion() {
    // Aquí iría la lógica de autenticación en el futuro
    console.log('Iniciando sesión...');
    // Por ahora, simplemente navegamos al home
    this.router.navigate(['/home']);
  }
}

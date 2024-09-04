import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSubmit() {
    try {
      const result = await this.authService.login(this.email, this.password).toPromise();
      console.log('Login exitoso', result);
      this.router.navigate(['/home']);
    } catch (error: unknown) {
      console.error('Error en el login', error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.presentToast('Credenciales inválidas');
        } else {
          this.presentToast('Error en el servidor. Por favor, intenta más tarde.');
        }
      } else {
        this.presentToast('Ocurrió un error inesperado');
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}

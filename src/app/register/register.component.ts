import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', [Validators.required, this.rutValidator], [this.rutUniqueValidator.bind(this)]],
      fecha_nacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [this.emailUniqueValidator.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      telefono: ['', [Validators.required, this.telefonoChilenoValidator]],
      nro_departamento: ['', Validators.required],
      tipo_residente: ['', Validators.required],
      nro_estacionamiento: [''],
      nro_bodega: ['']
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
    // Inicialización adicional si es necesaria
  }

  rutValidator(control: AbstractControl): ValidationErrors | null {
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/;
    const valid = rutRegex.test(control.value);
    return valid ? null : { invalidRut: true };
  }

  telefonoChilenoValidator(control: AbstractControl): ValidationErrors | null {
    const telefonoRegex = /^(\+?56|0)[2-9]\d{8}$/;
    const valid = telefonoRegex.test(control.value);
    return valid ? null : { invalidTelefono: true };
  }

  rutUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.checkRutAvailability(control.value).pipe(
      map(isAvailable => isAvailable ? null : { rutTaken: true }),
      catchError(() => of(null))
    );
  }

  emailUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.checkEmailAvailability(control.value).pipe(
      map(isAvailable => isAvailable ? null : { emailTaken: true }),
      catchError(() => of(null))
    );
  }

  checkPasswords(group: FormGroup): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en el registro', error);
          if (error.error.field === 'email') {
            this.registerForm.get('email')?.setErrors({ emailTaken: true });
          } else if (error.error.field === 'rut') {
            this.registerForm.get('rut')?.setErrors({ rutTaken: true });
          } else {
            this.error = error.error.message || 'Ocurrió un error durante el registro';
          }
        }
      });
    } else {
      this.error = 'Por favor, completa todos los campos requeridos correctamente.';
    }
  }
}
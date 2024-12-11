import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../pages/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup; // Formulario reactivo

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService, // Servicio de autenticación
    private router: Router // Redirección de rutas
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    if (this.form.valid) {
      const { user, password } = this.form.value;

      // Solicitud al backend para validar credenciales
      this.http
        .get(`http://localhost:3000/api/login?user=${user}&password=${password}`)
        .subscribe(
          (response: any) => {
            console.log('Credenciales correctas');

            // Actualiza el estado de autenticación con el servicio
            this.authService.login(response.rol, response.id);

            // Redirige al usuario al home
            this.router.navigate(['/home']);
          },
          (error: any) => {
            console.error('Credenciales incorrectas', error);
            alert('Credenciales incorrectas');
            this.form.reset();
          }
        );
    }
  }

  // Agrega este método para solucionar el error de la plantilla
  unsplashClass(): any {
    return {
      'min-height': '100%',
      background: `url("https://loremflickr.com/1200/900/tools") no-repeat center center`,
      'background-size': 'cover',
      position: 'relative',
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  styleImage = 'tool';
  form!: FormGroup; // Indicar que la propiedad form será inicializada en el constructor

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}


  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  unsplashClass(): any {
    return {
      'min-height': '100%',
      background: `url("https://source.unsplash.com/random/1200x900?"${this.styleImage}) no-repeat center center`,
      'background-size': 'cover',
      position: 'relative',
    };
  }

/*   login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(`'%c'USER: ${value.email} - PASSWORD: ${value.password}`, 'background: #222; color: #bada55');
    }
  }

 */

  login(): void {
    if (this.form.valid) {
      const { user, password } = this.form.value;
  
      // Realizar la solicitud al backend para verificar las credenciales
      this.http.get(`http://localhost:3000/api/login?user=${user}&password=${password}`).subscribe(
        (response: any) => {
          // Las credenciales son correctas, realizar las acciones necesarias (por ejemplo, redireccionar)
          console.log('Credenciales correctas');
          
          // Almacenar el rol en el almacenamiento local
          localStorage.setItem('userRole', response.rol);

          // Almacenar el id del usuario en el almacenamiento local
          localStorage.setItem('userId', response.id);
          
          // Redireccionar a la página de inicio
          window.location.href = '/home';
        },
        (error: any) => {
          // Las credenciales son incorrectas, mostrar mensaje de error o realizar acciones adicionales
          console.error('Credenciales incorrectas', error);
          alert('Credenciales incorrectas');
          // Limpiar el formulario
          this.form.reset();
        }
      );
    }
  }
  
}




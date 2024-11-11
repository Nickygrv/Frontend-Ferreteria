import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registerForm!: FormGroup;
  mensaje: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      
      // Paso 1: Registrar el usuario en la tabla `usuario`
      this.http.post('http://localhost:3000/usuarios', {
        usuario: formData.usuario,
        contrasena: formData.contrasena
      }).subscribe(
        (response: any) => {
          const usuarioId = response.usuarioId;

          // Paso 2: Registrar el perfil en la tabla `perfil_usuario`
          this.http.post('http://localhost:3000/perfil_usuario', {
            usuarioId: usuarioId,
            nombre: formData.nombre,
            correo: formData.correo,
            direccion: formData.direccion,
            telefono: formData.telefono
          }).subscribe(
            () => {
              this.mensaje = 'Usuario y perfil registrados con éxito';
              alert(this.mensaje);
              this.registerForm.reset();
            },
            (error) => {
              console.error('Error al registrar el perfil:', error);
              this.mensaje = 'Error al registrar el perfil';
              alert(this.mensaje);
            }
          );
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
          this.mensaje = 'Error al registrar el usuario';
        }
      );
    } else {
      this.mensaje = 'Por favor, complete todos los campos correctamente';
    }
  }
}

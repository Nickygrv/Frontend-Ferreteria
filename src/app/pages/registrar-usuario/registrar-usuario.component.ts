import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent {
  mensaje: string = ''; // Mensaje para mostrar al usuario
  usuario = {
    nombre: '',
    correo: '',
    direccion: '',
    telefono: '',
    contrasena: '',
  };

  constructor(private http: HttpClient) {}

  // Método para manejar el registro del usuario
  submitForm() {
    // Validar que todos los campos estén completos
    if (this.usuario.nombre && this.usuario.correo && this.usuario.direccion && this.usuario.telefono && this.usuario.contrasena) {
      this.mensaje = 'Usuario registrado con éxito'; // Mensaje de éxito
      
      // Aquí puedes descomentar el siguiente bloque para realizar la solicitud HTTP
      /*
      this.http.post('http://localhost:3000/api/usuarios', this.usuario).subscribe(
        response => {
          console.log('Registro exitoso', response);
          this.mensaje = 'Usuario registrado con éxito';
          this.limpiarFormulario();
        },
        error => {
          console.error('Error al registrar el usuario', error);
          this.mensaje = 'Ocurrió un error al registrar el usuario';
        }
      );
      */

      // Limpiar el formulario después del registro
      this.limpiarFormulario();
    } else {
      this.mensaje = 'Por favor, complete todos los campos'; // Mensaje de error
    }
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.usuario = {
      nombre: '',
      correo: '',
      direccion: '',
      telefono: '',
      contrasena: '',
    };
  }
}

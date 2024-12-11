import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa el router para redirigir

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  perfil: any = {}; // Propiedad para almacenar los datos del perfil

  // Obtener el ID del usuario del localStorage
  usuarioId: string | null = localStorage.getItem('userId');

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Comprobar si el ID del usuario existe
    if (this.usuarioId) {
      // Solicitud al backend para obtener los datos del perfil por ID de usuario
      this.http.get(`http://localhost:3000/api/usuarios/detalles/${this.usuarioId}`).subscribe(
        (data: any) => {
          this.perfil = data; // Asignar los datos obtenidos al objeto perfil
          console.log(data); // Ver los datos recibidos en consola
        },
        (error) => {
          console.error('Error al obtener el perfil:', error);
          alert('Error al obtener el perfil');
        }
      );
    } else {
      console.error('ID de usuario no encontrado en localStorage');
      alert('ID de usuario no encontrado');
    }
  }

  submitForm() {
    // Verifica si el perfil tiene los campos correctamente llenados antes de enviar la solicitud
    if (!this.perfil.nombre || !this.perfil.correo_electronico || !this.perfil.direccion || !this.perfil.telefono) {
      alert('Por favor, complete todos los campos.');
      return; // Evita enviar el formulario si faltan campos
    }

    // Verifica que el usuarioId esté disponible antes de enviar la solicitud
    if (!this.usuarioId) {
      alert('Usuario no encontrado');
      return;
    }

    // Solicitud al backend para actualizar los datos del perfil
    this.http.put(`http://localhost:3000/api/usuarios/detalles/${this.usuarioId}`, this.perfil).subscribe(
      (response: any) => {
        console.log('Perfil actualizado exitosamente');
        alert('Perfil actualizado exitosamente');
        // Redireccionar a la página de perfil después de la actualización
        this.router.navigate(['/perfil']);
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        alert('Error al actualizar el perfil');
      }
    );
  }
}

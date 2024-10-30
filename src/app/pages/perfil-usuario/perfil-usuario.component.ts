import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  perfil: any = {}; // Propiedad para almacenar los datos del perfil

  // Obtener el ID del usuario del localStorage
  usuarioId = localStorage.getItem('userId');

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Comprobar si el ID del usuario existe
    if (this.usuarioId) {
      // Solicitud al backend para obtener los datos del perfil por ID de usuario
      this.http.get('http://localhost:3000/perfil/' + this.usuarioId).subscribe((data: any) => {
        this.perfil = data; // Asignar los datos obtenidos al objeto perfil
        console.log(data);
      }, (error) => {
        console.error('Error al obtener el perfil:', error);
        alert('Error al obtener el perfil');
      });
    } else {
      console.error('ID de usuario no encontrado en localStorage');
      alert('ID de usuario no encontrado');
    }
  }
  

  submitForm() {
    // Solicitud al backend para actualizar los datos del perfil
    this.http.put('http://localhost:3000/perfil/' + this.usuarioId, this.perfil).subscribe((response: any) => {
      console.log('Perfil actualizado exitosamente');
      alert('Perfil actualizado exitosamente');
      // Redireccionar a la página de inicio o a otra página relevante
      window.location.href = '/perfil';
    });
  }
}

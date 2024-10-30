import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userRole: string | null;
  userId: string | null;

  constructor() {
    // Obtener el rol del usuario almacenado en el localStorage
    this.userRole = localStorage.getItem('userRole');
    this.userId = localStorage.getItem('userId');
    console.log(this.userRole);
    console.log(this.userId);
  }

  logout(): void {
    // Eliminar el rol del almacenamiento local
    localStorage.removeItem('userRole');

    // Eliminar el id del usuario del almacenamiento local
    localStorage.removeItem('userId');

    // Realizar acciones adicionales, como redireccionar a la página de inicio de sesión
    window.location.href = '/';
  }
}

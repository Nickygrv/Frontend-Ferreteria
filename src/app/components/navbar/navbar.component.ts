import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/services/auth.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al estado del rol de usuario
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

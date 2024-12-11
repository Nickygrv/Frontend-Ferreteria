import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  userRole$ = this.userRoleSubject.asObservable();

  constructor() {}

  // Método para iniciar sesión
  login(role: string, userId: string): void {
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userId);
    this.userRoleSubject.next(role);
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.userRoleSubject.next(null);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('userRole');
  }

  // Obtener el rol del usuario
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }
}

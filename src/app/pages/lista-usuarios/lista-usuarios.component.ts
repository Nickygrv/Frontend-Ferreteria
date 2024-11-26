import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface UsersList {
  id: number;
  usuario: string;
  role: string;
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'usuario', 'role', 'detalles'];  // Agrega 'detalles' aquí

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<UsersList>();

  // Constructor con inyección de dependencias
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient 
  ) {}

  // Método para aplicar el filtro de búsqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Método para navegar a la página de detalles de un usuario
  verDetalles(id: number): void {
    if (id) {
      this.router.navigate(['/detalles-usuario', id]);  // Redirige a la página de detalles con el ID del usuario
    }
  }

  // Método de inicialización del componente
  ngOnInit() {
    // Obtener los datos desde la API y asignarlos al dataSource
    this.http.get<UsersList[]>('http://localhost:3000/api/usuarios').subscribe(
      (data) => {
        this.dataSource.data = data; // Asigna los datos al dataSource de la tabla
      },
      (error) => {
        console.error('Error al obtener los datos de los usuarios', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'usuario', 'role', 'detalles'];
  dataSource = new MatTableDataSource<UsersList>();

  constructor(private router: Router, private http: HttpClient) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  verDetalles(id: number): void {
    if (id) {
      this.router.navigate(['/detalles-usuario', id]);
    }
  }

  ngOnInit() {
    this.http.get<UsersList[]>('http://localhost:3000/api/usuarios').subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener los datos de los usuarios:', error);
      }
    );
  }
}

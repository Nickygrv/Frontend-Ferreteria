import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';

export interface UsersList {
  id: number;
  usuario: string;
  role: string;
}

const ELEMENT_DATA: UsersList[] = [];

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  displayedColumns: string[] = ['id', 'usuario', 'role'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient 
  ) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/usuarios').subscribe((data: any) => {
      this.dataSource.data = data; // Asigna los datos al dataSource de la tabla
      console.log(data);
    });
  }

}

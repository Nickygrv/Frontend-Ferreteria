import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';

export interface ProductsInventory {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  stock: number;
  descripcion: string;
}
 
const ELEMENT_DATA: ProductsInventory[] = [];

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  displayedColumns: string[] = ['id', 'nombre', 'imagen', 'precio', 'stock', 'descripcion', 'deleteicon', 'updateicon'];
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

  ngOnInit(): void {
    this.http.get<ProductsInventory[]>('http://localhost:3000/api/datos').subscribe(
      (data) => {
        console.log('Datos obtenidos:', data);
        this.dataSource.data = data; // Asignar los datos obtenidos a la dataSource
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }
  

  navigateToUpdatePage(productId: number) {
    this.router.navigate(['/actualizar-producto', productId]);
  }

  openConfirmationDialog(id: string, nombre: string): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { id, nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Filtra el producto para eliminarlo
        this.dataSource.data = this.dataSource.data.filter(product => product.id !== Number(id));  // Convertir id a number
      }
    });
  }
}

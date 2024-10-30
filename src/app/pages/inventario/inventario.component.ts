import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';

export interface ProductsInventory {
  name: string;
  id: number;
  image: string;
  precio: number;
  cantidad: number;
  descripcion: string;
}

const ELEMENT_DATA: ProductsInventory[] = [];

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  displayedColumns: string[] = ['id', 'name', 'image', 'precio', 'cantidad', 'descripcion', 'deleteicon', 'updateicon'];
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
    this.http.get('http://localhost:3000/api/datos').subscribe((data: any) => {
      this.dataSource.data = data; // Asigna los datos al dataSource de la tabla
      console.log(data);
    });
  }

  navigateToUpdatePage(productId: number) {
    this.router.navigate(['/actualizar-producto', productId]);
  }  

/*   updateData(element: any) {
    // Navegar a otra pantalla con los datos de element
    this.router.navigate(['/updateproduct', { data: JSON.stringify(element) }]);
  } */

  openConfirmationDialog(id: string, nombre: string): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { id, nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ... do something here
      }
    });
  }
}

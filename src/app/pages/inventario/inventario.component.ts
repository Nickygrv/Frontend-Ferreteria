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

  minPrice: number = 0;
  maxPrice: number = 10000;
  searchFilter: string = ''; // Variable para almacenar el filtro de búsqueda

  // Variables de control para evitar problemas con los filtros
  private originalData: ProductsInventory[] = [];

  applyFilter(event: Event) {
    this.searchFilter = (event.target as HTMLInputElement).value;
    this.filterData();
  }

  applyPriceFilter(): void {
    // Restablecer el filtro de búsqueda y aplicar filtro de precios
    this.searchFilter = '';
    this.filterData();
  }

  filterData(): void {
    // Filtrar por precio
    let filteredByPrice = this.originalData.filter(product => 
      product.precio >= this.minPrice && product.precio <= this.maxPrice
    );

    // Luego aplicar el filtro de búsqueda sobre los resultados filtrados por precio
    if (this.searchFilter.trim()) {
      filteredByPrice = this.applySearchFilter(filteredByPrice);
    }

    // Actualizar la dataSource con los productos filtrados
    this.dataSource.data = filteredByPrice;
  }

  applySearchFilter(filteredData: ProductsInventory[]): ProductsInventory[] {
    const filterValue = this.searchFilter.trim().toLowerCase();

    return filteredData.filter(product => {
      return (
        product.nombre.toLowerCase().includes(filterValue) || 
        product.descripcion.toLowerCase().includes(filterValue) || 
        product.precio.toString().includes(filterValue) ||
        product.stock.toString().includes(filterValue)
      );
    });
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
        this.originalData = data; // Guardar los datos originales
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
        this.originalData = this.originalData.filter(product => product.id !== Number(id));  // Convertir id a number
        this.filterData(); // Reaplicar los filtros después de eliminar un producto
      }
    });
  }
}

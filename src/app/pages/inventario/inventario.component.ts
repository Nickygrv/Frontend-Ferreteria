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
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'imagen',
    'precio',
    'stock',
    'descripcion',
    'deleteicon',
    'updateicon',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  minPrice: number = 0;
  maxPrice: number = 10000;
  searchFilter: string = ''; // Variable para almacenar el filtro de búsqueda
  noDataMessage: string = 'No hay productos disponibles.'; // Mensaje dinámico

  private originalData: ProductsInventory[] = [];

  applyFilter(event: Event) {
    this.searchFilter = (event.target as HTMLInputElement).value;
    this.filterData();
  }

  applyPriceFilter(): void {
    if (this.minPrice > this.maxPrice) {
      alert('El precio mínimo no puede ser mayor que el precio máximo.');
      return;
    }

    this.filterData();
  }

  filterData(): void {
    let filteredByPrice = this.originalData.filter(
      (product) =>
        product.precio >= this.minPrice && product.precio <= this.maxPrice
    );

    if (this.searchFilter.trim()) {
      filteredByPrice = filteredByPrice.filter((product) =>
        product.nombre.toLowerCase().includes(this.searchFilter.toLowerCase())
      );
    }

    this.dataSource.data = filteredByPrice;

    if (filteredByPrice.length === 0) {
      if (this.searchFilter.trim() && (this.minPrice || this.maxPrice)) {
        this.noDataMessage =
          'No hay productos disponibles en este rango de precio y con el criterio ingresado.';
      } else if (this.searchFilter.trim()) {
        this.noDataMessage =
          'No hay productos disponibles con este criterio de búsqueda.';
      } else {
        this.noDataMessage =
          'No hay productos disponibles en este rango de precio.';
      }
    }
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get<ProductsInventory[]>('http://localhost:3000/api/datos')
      .subscribe(
        (data) => {
          this.originalData = data;
          this.dataSource.data = data;
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
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '300px',
        data: { id, nombre },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.originalData = this.originalData.filter(
          (product) => product.id !== Number(id)
        );
        this.filterData();
      }
    });
  }
}

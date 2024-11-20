import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class InventarioComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'image',
    'precio',
    'cantidad',
    'descripcion',
    'deleteicon',
    'updateicon'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // Form group for adding/updating products
  productForm: FormGroup;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    // Initialize the form group with validation rules
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // ID debe ser numérico y obligatorio
      name: ['', Validators.required], // Nombre obligatorio
      image: ['', Validators.required], // Imagen obligatoria
      precio: ['', [Validators.required, Validators.min(1)]], // Precio obligatorio y mayor a 0
      cantidad: ['', [Validators.required, Validators.min(0)]], // Cantidad obligatoria y mayor o igual a 0
      descripcion: [''] // Descripción opcional
    });
  }

  ngOnInit() {
    // Cargar datos del backend
    this.http.get('http://localhost:3000/api/datos').subscribe(
      (data: any) => {
        this.dataSource.data = data; // Asigna los datos al dataSource de la tabla
        console.log(data);
      },
      error => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  // Método para filtrar los datos en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Navegar a la página de actualización
  navigateToUpdatePage(productId: number) {
    this.router.navigate(['/actualizar-producto', productId]);
  }

  // Abrir el diálogo de confirmación para eliminar un producto
  openConfirmationDialog(id: string, nombre: string): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { id, nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se confirma la eliminación, realiza la petición al backend
        this.http.delete(`http://localhost:3000/api/datos/${id}`).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter((product: any) => product.id !== id);
          },
          error => {
            console.error('Error al eliminar el producto:', error);
          }
        );
      }
    });
  }

  // Método para agregar un nuevo producto
  addProduct() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;

      // Enviar el nuevo producto al backend
      this.http.post('http://localhost:3000/api/datos', newProduct).subscribe(
        (response: any) => {
          console.log('Producto añadido con éxito:', response);
          this.dataSource.data = [...this.dataSource.data, response]; // Añadir nuevo producto a la tabla
          this.productForm.reset(); // Limpiar formulario
        },
        error => {
          console.error('Error al añadir producto:', error);
        }
      );
    } else {
      console.warn('Formulario no válido');
    }
  }
}

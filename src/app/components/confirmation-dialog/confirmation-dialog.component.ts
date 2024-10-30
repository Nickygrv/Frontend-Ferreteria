import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient // Agrega esta línea
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    // Realiza la solicitud de eliminación al servidor
    const productId = this.data.id;
    this.http.delete(`http://localhost:3000/productos/${productId}`).subscribe(() => {
      this.dialogRef.close(true); // Indica que se ha borrado exitosamente
      alert('Producto eliminado exitosamente');
      // volver a cargar pagina de inventario
      window.location.reload();
    });
  }
}



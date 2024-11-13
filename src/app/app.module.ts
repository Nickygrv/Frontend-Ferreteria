import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NuevoProductoComponent } from './pages/nuevo-producto/nuevo-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ActualizarProductoComponent } from './pages/actualizar-producto/actualizar-producto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './pages/login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InventarioComponent,
    ContactosComponent,
    ConfirmationDialogComponent,
    NuevoProductoComponent,
    ActualizarProductoComponent,
    LoginComponent,
    PedidosComponent,
    PerfilUsuarioComponent,
    RegistrarUsuarioComponent,
    ListaUsuariosComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule,
    MatButtonModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

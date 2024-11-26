import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { NuevoProductoComponent } from './pages/nuevo-producto/nuevo-producto.component';
import { ActualizarProductoComponent } from './pages/actualizar-producto/actualizar-producto.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import {ListaProductosComponent} from "./pages/lista-productos/lista-productos.component";
import { DetallesUsuarioComponent } from './pages/detalles-usuario/detalles-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'nuevo-producto', component: NuevoProductoComponent },
  { path: 'actualizar-producto/:id', component: ActualizarProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'lista-usuarios', component: ListaUsuariosComponent },
  { path: 'lista-productos', component: ListaProductosComponent},
  { path: 'detalles-usuario/:id', component: DetallesUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

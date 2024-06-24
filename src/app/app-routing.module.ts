import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandComponent } from './interfazes/compartido/land/land.component';
import { LoginRegisterComponent } from './interfazes/componentes/login-register/login-register.component';
import { NavbardComponent } from './interfazes/compartido/navbard/navbard.component';
import { DashAdminComponent } from './interfazes/componentes/dash-admin/dash-admin.component';
import { DashUserComponent } from './interfazes/componentes/dash-user/dash-user.component';
import { AdminGuard } from './servicio/admin.guard';
import { UserGuard } from './servicio/user.guard';
import { Dashadmin1Component } from './interfazes/componentes/dash-admin/dashadmin1/dashadmin1.component';
import { Dashadmin2Component } from './interfazes/componentes/dash-admin/dashadmin2/dashadmin2.component';
import { RegistrarComputadoraComponent } from './interfazes/componentes/dash-admin/registrar-computadora/registrar-computadora.component';
import { VerComputadorasComponent } from './interfazes/componentes/dash-admin/ver-computadoras/ver-computadoras.component';
import { EspecificacionProductoComponent } from './interfazes/componentes/dash-admin/especificacion-producto/especificacion-producto.component';
import { DetallesProductoComponent } from './interfazes/componentes/dash-admin/detalles-producto/detalles-producto.component';
import { VercatalogoComponent } from './interfazes/componentes/dash-user/vercatalogo/vercatalogo.component';
import { DetallesProductooComponent } from './interfazes/componentes/dash-user/detalles-producto/detalles-producto.component';
import { CarritoComponent } from './interfazes/componentes/dash-user/carrito/carrito.component';
import { ResumenCompraComponent } from './interfazes/componentes/dash-user/resumen-compra/resumen-compra.component';
import { OrdenesComponent } from './interfazes/componentes/dash-user/ordenes/ordenes.component';
import { Parte1Component } from './interfazes/compartido/land/parte1/parte1.component';
import { FooterComponent } from './interfazes/compartido/footer/footer.component';
import { EspecificacionListaComponent } from './interfazes/componentes/dash-admin/especificacion-lista/especificacion-lista.component';
import { FavoritosComponent } from './interfazes/componentes/dash-user/favoritos/favoritos.component';
import { PerfilComponent } from './interfazes/componentes/dash-user/perfil/perfil.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandComponent },
  { path: 'login-registro', component: LoginRegisterComponent },
  { path: 'part1', component: Parte1Component },
  { path: 'footer', component: FooterComponent },


  {
    path: 'admin', component: DashAdminComponent, canActivate: [AdminGuard],
    children: [
      { path: 'dash1', component: Dashadmin1Component },
      { path: 'dash2', component: Dashadmin2Component },
      { path: 'registro-computadora', component: RegistrarComputadoraComponent },
      { path: 'ver-computadora', component: VerComputadorasComponent },
      { path: 'especificacion', component: EspecificacionProductoComponent },
      { path: 'producto-detalles/:id', component: DetallesProductoComponent },
      { path: 'lista-especificacion', component: EspecificacionListaComponent },
      { path: 'perfil', component: PerfilComponent  },

    ]
  },
  {
    path: 'user', component: DashUserComponent, canActivate: [UserGuard],
    children: [
      { path: 'ver-catalogo', component: VercatalogoComponent },
      { path: 'producto-detallesuser/:id', component: DetallesProductooComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: 'resumen-compra/:ordenId', component: ResumenCompraComponent },
      { path: 'favoritos', component: FavoritosComponent  },
      { path: 'perfil', component: PerfilComponent  },

    ]


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

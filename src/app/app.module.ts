import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './interfazes/compartido/footer/footer.component';
import { NavbardComponent } from './interfazes/compartido/navbard/navbard.component';
import { LandComponent } from './interfazes/compartido/land/land.component';
import { LoginRegisterComponent } from './interfazes/componentes/login-register/login-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashAdminComponent } from './interfazes/componentes/dash-admin/dash-admin.component';
import { DashUserComponent } from './interfazes/componentes/dash-user/dash-user.component';
import { Dashadmin1Component } from './interfazes/componentes/dash-admin/dashadmin1/dashadmin1.component';
import { Dashuser1Component } from './interfazes/componentes/dash-user/dashuser1/dashuser1.component';
import { Dashuser2Component } from './interfazes/componentes/dash-user/dashuser2/dashuser2.component';
import { Dashadmin2Component } from './interfazes/componentes/dash-admin/dashadmin2/dashadmin2.component';
import { RegistrarComputadoraComponent } from './interfazes/componentes/dash-admin/registrar-computadora/registrar-computadora.component';
import { VerComputadorasComponent } from './interfazes/componentes/dash-admin/ver-computadoras/ver-computadoras.component';
import { AuthInterceptor } from './servicio/auth-interceptor.service';
import { EspecificacionProductoComponent } from './interfazes/componentes/dash-admin/especificacion-producto/especificacion-producto.component';
import { DetallesProductoComponent } from './interfazes/componentes/dash-admin/detalles-producto/detalles-producto.component';
import { VercatalogoComponent } from './interfazes/componentes/dash-user/vercatalogo/vercatalogo.component';
import { DetallesProductooComponent } from './interfazes/componentes/dash-user/detalles-producto/detalles-producto.component';
import { CarritoComponent } from './interfazes/componentes/dash-user/carrito/carrito.component';
import { ResumenCompraComponent } from './interfazes/componentes/dash-user/resumen-compra/resumen-compra.component';
import { OrdenesComponent } from './interfazes/componentes/dash-user/ordenes/ordenes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { Parte1Component } from './interfazes/compartido/land/parte1/parte1.component';
import { EspecificacionListaComponent } from './interfazes/componentes/dash-admin/especificacion-lista/especificacion-lista.component';
import { FavoritosComponent } from './interfazes/componentes/dash-user/favoritos/favoritos.component';
import { PerfilComponent } from './interfazes/componentes/dash-user/perfil/perfil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { NouisliderModule } from 'ng2-nouislider';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbardComponent,
    LandComponent,
    LoginRegisterComponent,
    DashAdminComponent,
    DashUserComponent,
    Dashadmin1Component,
    Dashuser1Component,
    Dashuser2Component,
    Dashadmin2Component,
    RegistrarComputadoraComponent,
    VerComputadorasComponent,
    EspecificacionProductoComponent,
    DetallesProductoComponent,
    DetallesProductooComponent,
    VercatalogoComponent,
    CarritoComponent,
    ResumenCompraComponent,
    OrdenesComponent,
    Parte1Component,
    EspecificacionListaComponent,
    FavoritosComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSliderModule,
    NouisliderModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

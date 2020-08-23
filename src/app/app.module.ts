import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { AuthService } from './auth.service';
import {FormsModule} from '@angular/forms';
import { VideoentradaComponent } from './videoentrada/videoentrada.component';
import { MenuComponent } from './menu/menu.component';

import { FormularioComponent } from './formulario/formulario.component';
import { MapComponent } from './map/map.component';
import { RegistroComponent } from './registro/registro.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { EventodetalleComponent } from './eventodetalle/eventodetalle.component';
import { EventosgridComponent } from './eventosgrid/eventosgrid.component';
import { PlazadetalleComponent } from './plazadetalle/plazadetalle.component';

import {StoreModule} from '@ngrx/store'
import {reducer} from './reducers/evento.reducer';
import { CarritoiconoComponent } from './carritoicono/carritoicono.component';
import { ConfirmarcompraComponent } from './confirmarcompra/confirmarcompra.component';
import { PerfilComponent } from './perfil/perfil.component';
import {NgxPaginationModule} from 'ngx-pagination';

import {SidenavService} from './sidenav-service.service';
import { FooterComponent } from './footer/footer.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoentradaComponent,
    MenuComponent,

    FormularioComponent,
    MapComponent,
    RegistroComponent,
    EventodetalleComponent,
    EventosgridComponent,
    PlazadetalleComponent,
    CarritoiconoComponent,
    ConfirmarcompraComponent,
    PerfilComponent,
    FooterComponent,
    InfoComponent
    

  
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      evento: reducer
    }),
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,  
    AngularFireModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, NgxPaginationModule

  ],
  
  providers: [AuthService, AngularFireAuth, AngularFireDatabase, SidenavService],
  bootstrap: [AppComponent],
  
})
export class AppModule {


 }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoentradaComponent} from './videoentrada/videoentrada.component'
import {MenuComponent} from './menu/menu.component'
import {EventodetalleComponent} from './eventodetalle/eventodetalle.component'
import {EventosgridComponent} from './eventosgrid/eventosgrid.component'
import {PlazadetalleComponent} from './plazadetalle/plazadetalle.component'
import {ConfirmarcompraComponent} from './confirmarcompra/confirmarcompra.component'
import {PerfilComponent} from './perfil/perfil.component'

import {CompraModule} from './modules/compra/compra.module'

import {PlazaModule} from './modules/plaza/plaza.module'

import {InicioModule} from './modules/inicio/inicio.module'

import {PerfilModule} from './modules/perfil/perfil.module'

import {EventoModule} from './modules/evento/evento.module'

const routes: Routes = [
  { path: '', component: VideoentradaComponent },
  
  { path: 'menu', component: MenuComponent, 
  children:[
    { 
        path:'',
        redirectTo: 'inicio',
        pathMatch: 'full' 
     
    },
    {
      path:'inicio',
      loadChildren: './modules/inicio/inicio.module#InicioModule'
   
  },

   {
     path: 'perfil/:id',
     loadChildren: './modules/perfil/perfil.module#PerfilModule'
   },


    {
      path:'evento/:id',
      
      loadChildren: './modules/evento/evento.module#EventoModule'
      
  },

{
  path:'plaza/:id',
  loadChildren: './modules/plaza/plaza.module#PlazaModule'
},
{
  path:'compra',
  loadChildren: './modules/compra/compra.module#CompraModule'
},



]

},
 
{ path: '**', redirectTo: 'menu' },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

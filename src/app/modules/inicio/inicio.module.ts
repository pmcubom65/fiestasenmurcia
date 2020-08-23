import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventosgridComponent  } from '../../eventosgrid/eventosgrid.component';

const routes: Routes = [
  {
  path: '',
  component: EventosgridComponent
  }
  ];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InicioModule { }

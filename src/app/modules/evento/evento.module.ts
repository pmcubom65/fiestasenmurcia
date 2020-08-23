import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventodetalleComponent } from '../../eventodetalle/eventodetalle.component';


const routes: Routes = [
  {
  path: '',
  component: EventodetalleComponent
  }
  ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EventoModule { }

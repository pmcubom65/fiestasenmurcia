import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlazadetalleComponent } from '../../plazadetalle/plazadetalle.component';

const routes: Routes = [
  {
  path: '',
  component: PlazadetalleComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlazaModule { }

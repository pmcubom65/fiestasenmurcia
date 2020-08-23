import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmarcompraComponent } from '../../confirmarcompra/confirmarcompra.component';


const routes: Routes = [
  {
    path: '',
    component: ConfirmarcompraComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CompraModule { }

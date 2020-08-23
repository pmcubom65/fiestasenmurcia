import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from '../../perfil/perfil.component';

const routes: Routes = [
  {
  path: '',
  component: PerfilComponent
  }
  ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PerfilModule { }

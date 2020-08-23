import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';

import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';

import {MatExpansionModule} from '@angular/material/expansion';

import {MatSliderModule} from '@angular/material/slider';

import {MatPaginatorModule} from '@angular/material/paginator';


const material= [
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatTabsModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatExpansionModule,
  MatSliderModule,
  MatPaginatorModule
 
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }

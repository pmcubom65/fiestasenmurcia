import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  mensaje:string

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mensaje="Este evento ya esta pasado. Seleccione últimos eventos para actualizar la lista disponible"
  }


  
  cerrar() {
    this.dialog.closeAll();
  }
}

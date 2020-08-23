import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BbddService } from '../bbdd.service';
import { Observable, observable, Subscription } from 'rxjs';

import { Evento } from '../models/evento.model'

import { ServiciocarritoService } from '../serviciocarrito.service';

import { DataService } from "../data.service";

import {MatSliderChange} from '@angular/material/slider';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { AnimatecarritoService  } from "../animatecarrito.service";

import {Eventoclass } from '../models/eventoclass'


import {MatDialog} from '@angular/material/dialog';

import {InfoComponent} from '../info/info.component'

@Component({
  selector: 'app-eventosgrid',
  templateUrl: './eventosgrid.component.html',
  styleUrls: ['./eventosgrid.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000))
    ]
    )]
})
export class EventosgridComponent implements OnInit {

  eventos: Observable<Object>;

  breakpoint: number = 0;
  carrito: Observable<Evento[]>;
  muestrofiltrado:boolean=false;
  eventoarray: Eventoclass[]=[];
  p: number = 1;
  show:boolean=true;
 

  constructor(public bbddService: BbddService, public carritoService: ServiciocarritoService, private data: DataService,
    private animar:AnimatecarritoService, public dialog: MatDialog
    
    ) {

    this.eventos = this.bbddService.getEventos();


    this.carrito=this.carritoService.carrito;



}
 


  ngOnInit(): void {




    var width = document.body.clientWidth;

    this.breakpoint = (window.innerWidth <= 764) ? 2 : 3;


    this.data.currentMessage.subscribe(message => {
      if (message === 'filtra') {
        this.show=false;
        this.muestrofiltrado=true;
      } else {
        this.show=true;
        this.muestrofiltrado=false;
 
      }
    })




  }

  onResize(event) {

    this.breakpoint = (event.target.innerWidth <= 764) ? 2 : 3;

  }





  comprar(evento_id, tipo, dia, precio, unidades, foto, nombre, i) {
    console.log('Has comprado');

    if (dia<Date.now()){

      this.openDialogInfo();

    }else {

      this.animar.changeMessage('animate__animated animate__bounce animate__faster animate__repeat-3');

      var inicio=this.carritoService.dameUnidades(evento_id);

      if (inicio !== 0) {
        this.carritoService.quitar(evento_id);
  
      }
  
  
  
      var fecha = new Date(dia).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  
      var datos = tipo + ' ' + nombre + ' ' + fecha + ' ';
  
      unidades = unidades + inicio;
  
      this.carritoService.addCarrito(evento_id, datos, precio, unidades, foto);



    }
   


  }





  quitarfiltro() {
    this.data.changeMessage('no filtra')
    this.eventos = this.bbddService.getEventos();
  }



  onInputChange(event: MatSliderChange) {
 


   this.eventos=this.bbddService.getEventosByPrecio(event.value)
  }




  openDialogInfo() {
   
    const dialogRef = this.dialog.open(InfoComponent, {
      height: '40rem',
      width: '30rem',
      panelClass: 'my-custom-dialog-class',
      
    });
   
  }

}

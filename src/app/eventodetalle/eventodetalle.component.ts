import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { BbddService } from '../bbdd.service';
import {Router} from "@angular/router";

import { ServiciocarritoService } from '../serviciocarrito.service';
import { Observable, observable, Subscription } from 'rxjs';

import { Evento } from '../models/evento.model'

import { trigger, state, style, animate, transition } from '@angular/animations';  

import { AnimatecarritoService  } from "../animatecarrito.service";

import {MatDialog} from '@angular/material/dialog';

import {InfoComponent} from '../info/info.component'



@Component({
  selector: 'app-eventodetalle',
  templateUrl: './eventodetalle.component.html',
  styleUrls: ['./eventodetalle.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000))
    ]
    )]
})
export class EventodetalleComponent implements OnInit {

  precio:number;
  dia: string;
  nombre: string;
  tipo: string;
  foto: string;
  comprado:number=1;
  plaza:string;
  carrito: Observable<Evento[]>;

  constructor(private activatedRoute: ActivatedRoute, private bbddservice: BbddService ,  private router: Router,
    private animar:AnimatecarritoService,  public carritoService: ServiciocarritoService, public dialog: MatDialog) {
    
  this.carrito=this.carritoService.carrito;

   this.bbddservice.getEventoById(this.activatedRoute.snapshot.params['id']).subscribe(item=>{

      this.precio=item.data().precio;
      this.dia=item.data().dia;
      this.nombre=item.data().nombre;
      this.tipo=item.data().tipo;

      this.foto=item.data().foto;
      this.plaza=item.data().plaza;
      
   });


   this.comprado=(this.carritoService.dameUnidades(this.activatedRoute.snapshot.params['id'])==0)?1:this.carritoService.dameUnidades(this.activatedRoute.snapshot.params['id']);

  }

  ngOnInit(): void {
  }


  onValChange(value){
    if (Number(value)==-1 && this.comprado==1) {
      this.comprado=1;
    }else {
      this.comprado=this.comprado+Number(value);
    }
 
}


cambiar(data) {
   
  var route="/menu/plaza/"+data;
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([route]);
 }







 comprar(dia) {

  console.log('Has comprado');

  if (dia<Date.now()){

    this.openDialogInfo();

  }else {

    this.animar.changeMessage('animate__animated animate__bounce animate__faster animate__repeat-3');

    var evento_id=this.activatedRoute.snapshot.params['id'];
     
    var inicio=this.comprado;
  
     if (inicio !== 0) {
       this.carritoService.quitar(evento_id);
  
     }
  
  
     var fecha = new Date(this.dia).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  
     var datos = this.tipo + ' ' + this.nombre + ' ' + fecha + ' ';
  
     var unidades = this.comprado;
  
     this.carritoService.addCarrito(evento_id, datos, this.precio, unidades, this.foto);
  }






 }


 openDialogInfo() {
   
  const dialogRef = this.dialog.open(InfoComponent, {
    height: '40rem',
    width: '30rem',
    panelClass: 'my-custom-dialog-class',
    
  });
 
}


}

import { Component, OnInit , ElementRef , ViewChild, ViewChildren , AfterViewInit} from '@angular/core';
import { Observable, observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { Evento } from '../models/evento.model'
import {AppState} from '../app.state'
import { MatMenuTrigger } from '@angular/material/menu';
import { AnimatecarritoService  } from "../animatecarrito.service";
import {ChangeDetectorRef } from '@angular/core';


@Component({
  
  selector: 'app-carritoicono',
  templateUrl: './carritoicono.component.html',
  styleUrls: ['./carritoicono.component.scss'],

  
})
export class CarritoiconoComponent implements OnInit, AfterViewInit {

  carrito: Observable<Evento[]>;
 // menuc:string='menuc';
  total:number=0;
  crearanimacion:string;
 
  importetotal:number=0;

  @ViewChildren('carritoa') miboton: ElementRef;

  @ViewChild(MatMenuTrigger) menuc: MatMenuTrigger;

  mivariable:boolean=false;

  constructor(private store:Store<AppState>, private animar:AnimatecarritoService, private el: ElementRef,
    private cdref: ChangeDetectorRef ) { 

      
    
    this.carrito=store.select('evento');

    this.carrito.subscribe(item=> {
      let suma=0
      item.forEach(i=>{
        suma+=i.unidades;

    })
    this.total=suma;
  });



  this.carrito.subscribe(item=> {
      let suma=0;
    item.forEach(i=> {
    
      let valor= i.precio*i.unidades;
   
      suma=suma+valor;
     
    })
    this.importetotal=suma;
  })




  }

  ngOnInit(): void {
var element = document.getElementById("carritoa");

}

ngAfterContentChecked() {


  
   }


 
  ngAfterViewInit() {

   

    var element = document.getElementById("carritoa");


    this.animar.currentMessage.subscribe( mensaje => {
      
      if (mensaje) {
        var clases:string[]=mensaje.split(' ');

   /*     if (mensaje=='animate__animated animate__bounce animate__faster animate__repeat-3') {
          this.menuc.openMenu();
        }else {
          this.menuc.closeMenu();
        }*/


        clases.forEach(i=> {
          element.classList.add(i);
        })
  
  
      }

    
      
     
      
      if (element.classList.contains('animate__animated')) {
        setTimeout(()=> {
  
       
          element.classList.remove("animate__animated"); 
    
          element.classList.remove("animate__bounce"); 
          element.classList.remove("animate__faster"); 
      
          element.classList.remove("animate__repeat-3"); 
  
          element.offsetHeight;
        },7000);
      }
    })


 
    this.cdref.detectChanges();
   


}

}

import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { BbddService } from '../bbdd.service';
import {ActivatedRoute, NavigationStart, NavigationEnd} from '@angular/router';
import { Observable, observable } from 'rxjs';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';  
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-plazadetalle',
  templateUrl: './plazadetalle.component.html',
  styleUrls: ['./plazadetalle.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000))
    ]
    )],
  encapsulation: ViewEncapsulation.None,
  
})
export class PlazadetalleComponent implements OnInit {

  aforo:string;
  cp: string;
  direccion:string;
  municipio:string;
  nombre:string;
  telefono:string;
  foto:string;
  coordenadas:any;
  latitude: number;
  longitude:number;
  outcoordenadas: any[]=[];
  eventos: Observable<Object>;
  p: number = 1;
  fotos:string[]=[];
  galeria: string[]=['Foto 1', 'Foto 2', 'Foto 3', 'Foto 4', 'Foto 5']


  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;
  rutafoto:string;
  

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog,
    private bbddservice: BbddService, private location: Location) { 
    
    this.bbddservice.getPlazaById(this.activatedRoute.snapshot.params['id']).subscribe(item=>{

      this.aforo=item.data().Aforo;
      this.cp=item.data()['C.P.'];
      this.nombre=item.data().Nombre;
      
      this.direccion=item.data().Dirección;
      this.municipio=item.data().Municipio;
      this.telefono=item.data().Teléfono;
   
      this.foto=item.data().carro;
      
      this.coordenadas=item.data().Coordenadas;

      this.outcoordenadas=[Number(this.coordenadas.latitude), Number(this.coordenadas.longitude), this.nombre, this.direccion];

      
      this.galeria.forEach( (value, index) => {
        if (item.data()[value]) {
          this.fotos.push(item.data()[value]);
        }
      })



     

     
    
      
   });

          this.eventos= this.bbddservice.getEventosByPlaza(this.activatedRoute.snapshot.params['id']);


         

  



  }


  

 ngOnInit()  {
   
  }



  goBack() {
    setTimeout(()=> {
      this.location.back();
    },2000);
    
  }
  
  aumentar(ruta:string) {


    this.dialog.open(this.dialogRef, 
       { data: ruta });

      }

      cerrardialogimg() {
        this.dialog.closeAll();
      }

}

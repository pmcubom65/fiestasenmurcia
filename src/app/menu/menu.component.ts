import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {FormularioComponent} from '../formulario/formulario.component'

import {Router} from "@angular/router";
import { AuthService } from '../auth.service';
import { BbddService } from '../bbdd.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import {Store} from '@ngrx/store'
import {Evento} from '../models/evento.model'
import {AppState} from '../app.state'
import {Usuario} from '../models/usuario.models'


import {SidenavService} from '../sidenav-service.service'
import { ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from "../data.service";

import {AnimatecarritoService} from '../animatecarrito.service'




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 1000ms ease-out')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),


  ]
})




export class MenuComponent implements OnInit {

  items: Observable<Object>;
  selectedOption:Number;
  selectedOptions=[];

  opened:Boolean=false;
  login:Number=1;
  registrase:Number=2;
  logout=3;
  home=4;
  filtrar=5;
  traer=6;
  cerrarnav=7;
 
  eventos: Observable<Object>;

 elementostotales:number=0;
 carrito: Observable<Evento[]>;

  MiUsuario:Usuario;

  usuario:string='';

  verperfil:boolean=false;




  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;



  constructor(public firestore: AngularFirestore, public dialog: MatDialog, private router: Router,
    public authService: AuthService, public bbddService: BbddService, private sidenavs: SidenavService, private data: DataService,
    private store:Store<AppState>, private animar:AnimatecarritoService,
    
    
    ) {

      this.items = this.bbddService.getPlazas();
      this.eventos= this.bbddService.getEventos();
      this.carrito=store.select('evento');
      
  }







  ngAfterViewInit(): void {
    this.sidenavs.setSidenav(this.sidenav)
  }
 



  openDialogLogin() {
   
    const dialogRef = this.dialog.open(FormularioComponent, {
      height: '40rem',
      width: '30rem',
      panelClass: 'my-custom-dialog-class',
      
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.verperfil && this.MiUsuario) {
        this.router.navigate(['/menu/perfil', this.MiUsuario.uid]);
      }

    });
  }



  openDialogLogout(mensaje:string) {
   
    const dialogRef = this.dialog.open(FormularioComponent, {
      height: '30rem',
      width: '30rem',
      panelClass: 'my-custom-dialog-class',
      data: {
        dataKey: mensaje,
        usuario: this.MiUsuario
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.authService.usuariologin={
        nombre:'',
       email:'',
        uid:'',
       foto:''
      };
      this.MiUsuario= {
        nombre:'',
        email:'',
         uid:'',
        foto:''
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/menu/inicio']);
  });


  }




  ngOnInit(): void {

    this.authService.firebaseAuth.onAuthStateChanged(user => {


      if (user && user.photoURL) {
      
        this.MiUsuario= {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL
        }
 
      }else if (user) {

         this.authService.datosUsuario(user.email).then(async data=>
        
        {

          if (data) {
            this.MiUsuario= {
              nombre: await data.nombre,
              email: await data.email,
              uid: await data.usuario,
              foto: await data.url
            }
          }
        }

        );

    

      }    else {
      
       
      }


     
    });


  }

 

  onOptionChange($event) {
    this.selectedOption=$event.option._value;
    this.menuAcciones();
}


  menuAcciones() {
    switch (this.selectedOption) {
      case 1:
        this.sidenav.close();
        this.openDialogLogin();break;

        case 2:
          this.sidenav.close();
         
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
 
     if (this.MiUsuario) {
      this.router.navigate(['/menu/perfil', this.MiUsuario.uid]);
     }else {
       this.verperfil=true;
       this.openDialogLogin();
      
     }
  
        break;

        case 3:
          this.sidenav.close();
          this.animar.changeMessage('no mover')
      
          if(this.authService.logout()) {
            var mensajedialogof:string='Has cerrado la sesión con éxito'
       
            this.openDialogLogout(mensajedialogof);
          }else {
            var mensajedialogof:string='Error cerrando sesión';
            this.openDialogLogout(mensajedialogof);
          }
          
          
      
          break;


        case 4:
        
          this.router.navigate(['/menu']);this.sidenav.close();break;

          case 5:
           this.sidenav.close();
           this.data.changeMessage("filtra");
           this.router.navigate(['/menu']);
           break;



          case 6: 
          this.sidenav.close();
          if (this.MiUsuario) {
            this.bbddService.verId();
          } else {
            this.openDialogLogin();
          }
         
          break;


          case 7:
            this.sidenav.close();
            break;

      
    }
  }

  onClick() {
    this.menuAcciones();
  }






  cambiar(data) {
   
    var route="/menu/plaza/"+data;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([route]);
   }





}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationStart, NavigationEnd} from '@angular/router';
import { BbddService } from '../bbdd.service';
import { AuthService } from '../auth.service';
import {Usuario} from '../models/usuario.models'
import { Observable, observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';  

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000))
    ]
    )]
})
export class PerfilComponent implements OnInit {

  MiUsuario:Usuario;
  compras: Observable<Object>;
  importecompra:number;

  constructor(private activatedRoute: ActivatedRoute, private bbddservice: BbddService,  public authService: AuthService,) { 

    this.compras=this.bbddservice.mostrarCompras(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {


    this.authService.datosUsuarioPerfil(this.activatedRoute.snapshot.params['id']).then(data=>{
      if (data) {
        this.MiUsuario= {
          nombre: data.nombre,
          email: data.email,
          uid: this.activatedRoute.snapshot.params['id'],
          foto: data.url
        }
      }
    })

    this.authService.firebaseAuth.onAuthStateChanged(user => {


      if (user && typeof this.MiUsuario === 'undefined') {
      
        this.MiUsuario= {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL
        }
        if (!this.testImage(this.MiUsuario.foto)) {
          this.MiUsuario.foto='https://firebasestorage.googleapis.com/v0/b/pedro-manuel-cubo-medina.appspot.com/o/No_image.jpg?alt=media&token=380c7f4f-31b0-4b14-ac0d-e83106d15377';
        }
      }

     } );

    

      }    





      testImage(URL):boolean {
        var salida:boolean;
       
        var tester=new Image();
        tester.src=URL;
        tester.onload=()=>{
          salida=true;
        };
        tester.onerror=()=> {
         salida=false;
        };
       return salida;
    }

   

}



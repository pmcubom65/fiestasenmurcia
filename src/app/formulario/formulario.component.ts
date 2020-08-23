import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatDialog} from '@angular/material/dialog';

import {RegistroComponent} from '../registro/registro.component';
import { Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {Usuario} from '../models/usuario.models'

import {BbddService } from '../bbdd.service';
import { Observable } from 'rxjs';

import {Router} from "@angular/router";


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  email:string='';
  password:string='';
  show:boolean=true;
  mensaje:string;
  usuario:Usuario;
//  usuariodelabbdd: Observable<Object>;



  constructor(public authService: AuthService, public dialog: MatDialog,   @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  public bbddService: BbddService, private router: Router
  ) { 
    if (data) {
      this.show=false;
      this.usuario=data.usuario;

      if (typeof this.usuario!='undefined' && !this.testImage(this.usuario.foto)) {
        this.usuario.foto='https://firebasestorage.googleapis.com/v0/b/pedro-manuel-cubo-medina.appspot.com/o/No_image.jpg?alt=media&token=380c7f4f-31b0-4b14-ac0d-e83106d15377';
      }
      
      this.mensaje=''+data.dataKey;
    } else {
      this.mensaje='';
    }
  }

  ngOnInit(): void {

    var usuarioreg:string;
    this.authService.firebaseAuth.onAuthStateChanged(user => {


      if (user && user.displayName) {
      
        this.usuario= {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL
        }

        if (!this.testImage(this.usuario.foto)) {
          this.usuario.foto='https://firebasestorage.googleapis.com/v0/b/pedro-manuel-cubo-medina.appspot.com/o/No_image.jpg?alt=media&token=380c7f4f-31b0-4b14-ac0d-e83106d15377';
        }


       
 
      }else if (user) {

         this.authService.datosUsuario(user.email).then(async data=>
 
          {
            if (data) {
              this.usuario= {
                nombre: await data.nombre,
                email: await data.email,
                uid: await data.usuario,
                foto: await data.url
              }
            }
          }

        );

    

      } 





     
    });


}





  onSubmit(data) {
    console.log(data);
    this.email=data.email;
    this.password=data.password;
    this.login();
    
  }

  login() {
   this.authService.login(this.email, this.password).then(data=>{
     console.log(data)
    this.mensaje='Has iniciado sesión con éxito'; 
    this.show=!data;

    
     
   }).catch(data=>{
    this.mensaje='Error inicio de sesión';
     this.show=!data
   });

    this.email = this.password = '';
  }

  reggoogle() {
    if (this.authService.loginConGoogle()) {
    
      setTimeout(()=>{
        this.mensaje='Has iniciado sesión con éxito'; 
        this.show=false;
      }, 4000);

    } else {
      this.show=true;
      this.mensaje='Error inicio sesión con Google'
    }
   }
 
 
 async  refacebook() {
     if (await this.authService.loginConFacebook().catch((res) => {  
  
        this.show=true;
        this.mensaje=res
      
      })) {
    
      this.mensaje='Has iniciado sesión con éxito'; 
      this.show=false;
      
     } 
   }



  abredialogoregistro() {
   
    const dialogRef = this.dialog.open(RegistroComponent, {
      height: '40rem',
      width: '30rem',
      panelClass: 'my-custom-dialog-class',
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.authService.usuariologin) {
        this.router.navigate(['/menu/perfil', this.authService.usuariologin.uid]);
      }

    });


  }

  cerrar() {
    this.dialog.closeAll();
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

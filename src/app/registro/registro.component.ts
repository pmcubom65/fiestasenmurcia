import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import { FirebaseStorageService } from '../firebase-storage.service';
import { BbddService } from '../bbdd.service';
import { async } from 'rxjs/internal/scheduler/async';
import {Usuario} from '../models/usuario.models';

import {finalize} from 'rxjs/operators';
import { AngularFireUploadTask } from '@angular/fire/storage';


interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})






export class RegistroComponent implements OnInit {

  email: string;
  password: string;
  nombre:string;
  srcResult:any;
  file: File;
  public finalizado = false;
  public porcentaje = 0;
   public URLPublica = '';
   mensaje:string;
   uid:string;
   show:boolean=true;
   usuario:Usuario= {
    nombre: '',
    email: '',
    uid: '',
    foto: '',
  };;
  
  constructor(public authService: AuthService, public dialog: MatDialog,
    private firebaseStorage: FirebaseStorageService, public bbddService: BbddService) {  




   }

  ngOnInit(): void {

   
  }




signup(archivo:boolean) {
    
   this.authService.signup(this.email, this.password, this.nombre, archivo).then((data)=>{
        if (data) {

          console.log('registro '+data)
          this.usuario.uid=  data;
      
          this.mensaje='Usuario dado de alta con éxito'
          
        
        }
    }).catch(error=> {
      
        this.mensaje='El email ya se encuentra registrado'
      
    });

    this.email = this.password = '';

  }


 async onSubmit(data) {
   
  if (this.file!=null){
    this.tramitararchivo(data);

   }
    if (data.nombre && data.email && data.password) {
      this.email=data.email;
      this.password=data.password;
      this.nombre=data.nombre;

      this.usuario.email=data.email;
      this.usuario.nombre=data.nombre;

     if (this.file!=null){
 
      console.log('aqui '+this.signup(true));
     }else {
      this.signup(false);
     }
     

  

    } else {
      console.log('error campos')
      this.mensaje='Rellene nombre, email y password'
    }


  
/*    let archivo=data.file;

    if (this.file!=null) {


  
  } else {*/

   
 
 
   
  
    this.show=false;
  

   
  }


 tramitararchivo(data) {
    const path=`test/${Date.now()}_${this.file.name}`;
    const ref=this.firebaseStorage.referencia(path);

    let tarea:AngularFireUploadTask=this.firebaseStorage.tareaCloudStorage(path, this.file);



    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        console.log('finalizado upload')
        this.finalizado = true;


   
         if (this.finalizado) {
   setTimeout(()=>  ref.getDownloadURL().subscribe(async dataurl=>{
            if (await dataurl) {

              console.log(dataurl)
              this.usuario.foto=dataurl;
              
             this.bbddService.addUsuario(this.usuario.uid, data.nombre, dataurl, data.email);
            }



        }), 4000);
    
         }
        

        
   

      }
    });

    
  }






  importFile(event:any) {

    if (event.target.files.length == 0) {
      
       document.getElementById("nombrefoto").textContent='Archivo no seleccionado';
       return
    }
      this.file = event.target.files[0];
      
      if (this.file) {
        document.getElementById("nombrefoto").textContent=this.file.name;
        var fileReader=new FileReader();
        fileReader.onload=function(e) {
          
          document.getElementById("preview").setAttribute("src", e.target.result.toString())
        }
        fileReader.readAsDataURL(this.file);
      }
    }


  

  cerrar() {
    this.dialog.closeAll();
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFireFunctions} from '@angular/fire/functions';
import { BbddService } from './bbdd.service';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

import {Usuario} from './models/usuario.models'
import { async } from 'rxjs/internal/scheduler/async';
import { map } from 'rxjs/operators';

import { QuerySnapshot } from '@firebase/firestore-types';



@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  usuariologin: Usuario={
    nombre:'',
   email:'',
    uid:'',
   foto:''
  };
  authState: any = null;

  mensajeerror:string;

  Usuarioobs: Observable<Usuario>
  usuariouid:string;

  constructor(public firebaseAuth: AngularFireAuth, private afFun: AngularFireFunctions,
    public bbddService: BbddService) {
      
      this.firebaseAuth.authState.subscribe(auth => {
        if(auth) { 
       
          this.usuariologin.uid =  auth.uid;     
          this.usuariologin.nombre = auth.displayName;  
          this.usuariologin.email = auth.email;  
          this.usuariologin.foto = auth.photoURL;  
      }
      });

   
    
    }








  signup(email: string, password: string, nombre:string, archivo:boolean) {

    return new Promise<any>((resolve, reject) => {
 
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!');
        console.log(value.user.uid)

        if (archivo) {
          resolve(value.user.uid);
   
        }else {
          resolve(value.user.uid);
          this.bbddService.addUsuario(value.user.uid, nombre, 'https://firebasestorage.googleapis.com/v0/b/pedro-manuel-cubo-medina.appspot.com/o/No_image.jpg?alt=media&token=380c7f4f-31b0-4b14-ac0d-e83106d15377', email);
       
        }


        
      
       
        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        return reject(false);
      });


    });

      
  }


  datosUsuario(email:string) {
    var elusuariobbdd=  this.bbddService.getUsuarioById(email).then(async querySnapshot => {
      var  docs = querySnapshot.docs.map(doc => doc.data());
 

        return docs[0];

    })
 /*   elusuariobbdd.then(data=> {
      console.log(data)
    })*/

    return elusuariobbdd;
  }



  datosUsuarioPerfil(id:string) {
    var elusuariobbdd=  this.bbddService.getPerfilById(id).then(async querySnapshot => {
      var  docs = querySnapshot.docs.map(doc => doc.data());
      console.log('Document data:', docs[0]);

        return docs[0];

    })
    elusuariobbdd.then(data=> {
      console.log(data)
    })

    return elusuariobbdd;
  }



  login(email: string, password: string) {
    this.usuariologin.email=email;

    
/*  var elusuariobbdd=  this.bbddService.getUsuarioById(email).then(querySnapshot => {
      var docs =querySnapshot.docs.map(doc => doc.data());
      console.log('Document data:', docs[0]);

        return docs[0];

    })
    elusuariobbdd.then(data=> {
      console.log(data)
    })*/

    return new Promise<any>((resolve, reject) => {

    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        resolve(true)

   
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        reject(false)
      });
   

    });
  }

  logout() {

    return new Promise<any>((resolve, reject) => {
    this.firebaseAuth
      .signOut().then(data=>resolve(true)).catch(err=>reject(false));
    
    });
  }



  loginConGoogle() {

    return new Promise<any>((resolve, reject) => {

   this.firebaseAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(value=>resolve(true)).catch(error=>reject(false));


    });

  }


  loginConFacebook() {

    return new Promise<any>((resolve, reject) => {

 this.firebaseAuth.signInWithPopup(new auth.FacebookAuthProvider()).then( data=>{
    
    console.log(data)
    console.log(data.user);
    resolve(true)
    }).catch(err=>{
      
      console.log(err)
 
      reject(false)});
 

    });
  }






}

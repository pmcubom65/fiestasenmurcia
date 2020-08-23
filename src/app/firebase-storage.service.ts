import { Injectable } from '@angular/core';

import { AngularFireStorage, AngularFireStorageReference, AngularFireStorageModule
 } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private storage: AngularFireStorage) { }


//Tarea para subir archivo
public tareaCloudStorage(nombreArchivo: string, datos: any) {
  return this.storage.upload(nombreArchivo, datos);
  }


public referencia(path) {
  
  return this.storage.ref(path)
}


//Referencia del archivo
public referenciaCloudStorage(nombreArchivo: string) {
  var nulo:string;
  var referencia=this.storage.storage.ref().child(nombreArchivo)

//return  referencia.getDownloadURL().toPromise()

return referencia.getDownloadURL();


}












}






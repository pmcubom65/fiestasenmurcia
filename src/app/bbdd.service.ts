import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Evento } from './models/evento.model'
import {Usuario  } from './models/usuario.models'
import { Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BbddService {

  items: Observable<any[]>;
  usuario:Usuario;

  id:Array<string>=new Array<string>();

  evento: Observable<any[]>;
  carrito: Observable<any[]>;

  tipos: Array<string>=['Concierto', 'Recortadores', 'Rejoneadores', 'Novillada', 'Capea', 
                      'Corrida de toros', 'Motocross', 'Cine'];

  fotos: Array<string>=['concierto.png', 'recortadores.png', 'rejones.png', 
                          'novillada.png', 'capea.png', 
                      'corridas.png', 'motocross.png', 'cine.png'];

  horas: Array<number>=[19, 20, 21];

  ultimo:any;

  constructor(public firestore: AngularFirestore) {   
  }




//Math.floor(Math.random() * (max - min + 1)) + min;



   verId() {
    var plazasref=this.firestore.collection('plazas');
    var allplazas=plazasref.get().subscribe(snapshot=>{
      snapshot.forEach(element => {
        var seleccionado=Math.floor(Math.random() * (10-1 - 0 + 1)) + 0;
        var tipo=Math.floor(Math.random() * (this.tipos.length-1 - 0 + 1)) + 0;
        var hora=Math.floor(Math.random() * (this.horas.length-1 - 0 + 1));

      var dia= this.getUltimoEventoByPlaza(element.id).then( querySnapshot => {
          var  docs = querySnapshot.docs.map(doc =>  doc.data());
   
    
            return  docs[0];
    
        });

     /*   this.firestore.collection('eventos', ref => ref.where('plaza', '==', element.id)).get().subscribe(snapshot=>{
          snapshot.forEach(k=> {
            if (Math.abs(k.data().dia- seleccionado*24*60*60*1000)<86400000) {
              var seleccionado=Math.floor(Math.random() * (20-10  + 1)) + 10;
            }
          })
        })*/

      var damedia=dia.then(datadia=> {
       
        return    new Date(Number(datadia.dia) + seleccionado*24*60*60*1000).setHours(this.horas[hora],0,0)
      
      
      
      });

      damedia.then(data=> {
        if(data) {
          this.firestore.collection('eventos').add({
            plaza: element.id,
            nombre: element.data().Nombre,
            disponible: element.data().Aforo,
            foto: this.fotos[tipo],
            precio: Math.floor(Math.random() * 20) +1,
        //    dia: new Date(Date.now() + seleccionado*24*60*60*1000).setHours(this.horas[hora],0,0),
    
         
            tipo: this.tipos[tipo],
           dia:  data
          });
        }
      })


      });
    });

    }

    mostrarCompras(usuarioid:string) {
      return this.firestore.collection('compras', ref => ref.where('usuario', '==', usuarioid)).valueChanges({idField: 'compra_id'});
    }


    addCompra(usuarioid:string, importet:number, carrito:Observable<Evento[]>) {
      this.firestore.collection('compras').add({
        usuario: usuarioid,
        importe: importet,
        articulos: carrito,
        dia: Date.now() 
      })
    }



    addUsuario(uid:string, nom:string, URLPublica:string, emailuser:string) {
      this.firestore.collection('datosusuarios').add({
        usuario: uid,
        nombre: nom,
        url: URLPublica,
        email: emailuser
      })
    }



    getEventos() {
      
     return this.firestore.collection('eventos', ref => ref.orderBy('dia', 'desc')).valueChanges({idField: 'evento_id'});

    }


 


    getEventosByPrecio(preciodado) {
      return this.firestore.collection('eventos', ref => ref.where('precio', '<', preciodado).orderBy('precio', 'desc').orderBy('dia', 'desc')).valueChanges({idField: 'evento_id'});
    }


  getUsuarioById(usuarioemail:string) {

      const snapshot =  this.firestore.collection('datosusuarios', ref => ref.where('email', '==', usuarioemail)).get().toPromise();

        return snapshot;

  
    }



    getPerfilById(usuarioid:string) {

      const snapshot =  this.firestore.collection('datosusuarios', ref => ref.where('usuario', '==', usuarioid)).get().toPromise();

        return snapshot;

    }






    getEventoById(id:string) {
      return this.firestore.collection('eventos').doc(id).get();
    }

   
    getEventosByPlaza(id:string) {
      return this.firestore.collection('eventos', ref => ref.where('plaza', '==', id).orderBy('dia', 'desc')).valueChanges({idField: 'evento_id'});
    }



    getUltimoEventoByPlaza(id:string) {
      return this.firestore.collection('eventos', ref => ref.where('plaza', '==', id).orderBy('dia', 'desc').limit(1)).get().toPromise();
 
 
 
 
    }





    getPlazas() {
      return this.firestore.collection('plazas').valueChanges({idField: 'plaza_id'});
    }


    getPlazaById(id:string) {
      
      return this.firestore.collection('plazas').doc(id).get();
    }

  }



import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Evento } from './models/evento.model'
import * as EventoActions from './actions/evento.actions'
import { Observable, observable, Subscription } from 'rxjs';




@Injectable({
  providedIn: 'root'
})


export class ServiciocarritoService {

  carrito: Observable<Evento[]>;
  unidadescontadas: number = 0;

 
  total:number=0;
  
  constructor(private store: Store<AppState>) { 

    this.carrito = store.select('evento');
  }

  addCarrito(evento_id, evento_datos, evento_precio, evento_unidades, evento_foto) {
    this.store.dispatch(new EventoActions.AddEvento({
      id: evento_id,
      datos: evento_datos,
      precio: evento_precio,
      unidades: evento_unidades,
      imagen: evento_foto
    }))

  
  }

  quitar(indice: string) {
    this.store.dispatch(new EventoActions.RemoveEvento(indice));
  
  }


  dameUnidades(eventoID: string): number {
    this.carrito.subscribe(item => {
      let suma = 0
      item.forEach(i => {
        i.id == eventoID ? suma += i.unidades : suma = suma;

      })
      this.unidadescontadas = suma;
    });
    return this.unidadescontadas;
  }




}

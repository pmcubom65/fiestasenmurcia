import { Action } from '@ngrx/store'
import {Evento} from '../models/evento.model'
import * as EventoActions from '../actions/evento.actions';

const initialState: Evento = {
    id: 'id 1',
    datos: 'evento test',
    precio: 0,
    unidades: 0,
    imagen: ''
}

var copia:Evento[];


export function reducer(state: Evento[]=[], action: EventoActions.Actions) {
    
    switch(action.type) {
        case EventoActions.ADD_EVENTO:
            return [...state, action.payload];        
            
   

        case EventoActions.REMOVE_EVENTO:
            const childArrayCopy=[...state.filter(item=>item.id!==action.payload)];
           

            return [...childArrayCopy];



        default: 
            return state;
    }
}
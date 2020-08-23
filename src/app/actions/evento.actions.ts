import {Injectable} from '@angular/core'
import {Action} from '@ngrx/store'
import {Evento} from '../models/evento.model'

export const ADD_EVENTO = '[EVENTO] Add'
export const REMOVE_EVENTO = '[EVENTO] Remove'


export class AddEvento implements Action {
    readonly type= ADD_EVENTO

    constructor(public payload:Evento) {}
}


export class RemoveEvento implements Action {
    readonly type= REMOVE_EVENTO

    constructor(public payload:string) {}
}




export type Actions = AddEvento | RemoveEvento  //access actions to reducer
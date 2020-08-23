import {Deserializable} from './evento.model'

export class Eventoclass implements Deserializable  {
    id:string;
    datos:string;
    precio: number;
    unidades:number;
    imagen:string;


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
}
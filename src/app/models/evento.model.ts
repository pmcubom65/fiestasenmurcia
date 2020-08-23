export interface Evento {
    id:string,
    datos:string,
    precio: number,
    unidades:number,
    imagen:string
}


export interface Deserializable {
    deserialize(input: any): this;
  }

  
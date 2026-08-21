import{nanoid} from 'nanoid'
export type Carritotipos={
  id:string,
  objetos:Carritoobjeto[],
  metodoentregaid?:number,
  paymentintentid?:string,
  clientsecret?:string
}

export type Carritoobjeto={
  productoid:number,
  productonombre:string,
  precio:number,
  cantidad:number,
  foto:string,
  tipo:string,
  marca:string

}

export class Carrito implements Carritotipos{
  id=nanoid();
  objetos: Carritoobjeto[] = []
   metodoentregaid?:number
  paymentintentid?:string
  clientsecret?:string
}



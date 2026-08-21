export type usuario = {
  nombre:string,
  apellido:string,
  email:string,
  address:Address
}

export type Direccion ={
  linea1:string,
  linea2?:string,
  ciudad:string,
  provincia:string,
  codigopostal:string,
  pais:string
}

export type Address ={
  line1:string,
  line2?:string,
  city:string,
  state:string,
  postalcode:string,
  country:string

}

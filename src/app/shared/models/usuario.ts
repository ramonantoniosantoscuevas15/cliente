export type usuario = {
  nombre:string,
  apellido:string,
  email:string,
  direccion:Direccion
}

export type Direccion ={
  linea1:string,
  linea2?:string,
  ciudad:string,
  provincia:string,
  codigopostal:string,
  pais:string
}

export class document {
  id?: string = '';
  type: string = '';
  name: string = '';
  grupo: string = '';
  corpus: string = '';
  archivo: string = '';
  signatura: string = '';
  folios: string = '';
  anyo: string = '';
  mes: string = '';
  dia: string = '';
  lugar: string = '';
  provincia: string = '';
  pais: string = '';
  regesto: string = '';
  tipoDocumental: string = '';
  copista: string = '';
  firma: string = '';
  soporte: string = '';
  estado: string = '';
  transcriptor?: string = '';
  primerRevisor: string = '';
  segundoRevisor: string = '';
  textopaleografico: string = '';
  textocritico: string = '';
  creationdate!: Date;
}

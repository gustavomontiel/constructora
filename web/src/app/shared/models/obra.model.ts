import { Direccion } from './direccion.model';

export class Obra {

  public nombre: string;
  public descripcion: string;
  direccion?: Direccion;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;

}


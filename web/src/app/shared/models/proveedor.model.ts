import { Direccion } from './direccion.model';

export class Proveedor {
  public cuit: number;
  public nombre: string;
  public telefono?: string;
  public direccion: Direccion;
  // tslint:disable-next-line: variable-name
  public cuenta_corriente?: boolean;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;

}

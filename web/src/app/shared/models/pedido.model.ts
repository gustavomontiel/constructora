import { Usuario } from './usuario.model';

export class Pedido {
  // tslint:disable-next-line: variable-name
  public obra_id: number;
  public solicitante?: Usuario;
  public materiales: [];
  public herramientas: [];
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: number;
}

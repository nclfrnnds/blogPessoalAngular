import { Publicacao } from "./Publicacao";
import { Usuario } from "./Usuario";

export class Comentario {

  public id: number;
  public texto: string;
  public data: Date;
  public usuario: Usuario;
  public publicacao: Publicacao;

}

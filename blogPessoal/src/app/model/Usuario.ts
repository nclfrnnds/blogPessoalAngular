import { Comentario } from "./Comentario";
import { Publicacao } from "./Publicacao";

export class Usuario {

  public id: number;
  public nome: string;
  public nomeDeUsuario: string;
  public senha: string;
  public foto: string;
  public tipo: string;
  public publicacao: Publicacao[];
  public comentario: Comentario[];

}

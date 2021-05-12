import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  serverPort = environment.server + environment.port;

  entrar(usuarioLogin: UsuarioLogin) : Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(`${this.serverPort}/usuarios/login`, usuarioLogin);
  }

  cadastrar(usuario: Usuario) : Observable<Usuario> {
    return this.http.post<Usuario>(`${this.serverPort}/usuarios/cadastro`, usuario);
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.serverPort}/usuarios/${id}`);
  }

  logado() {
    let ok: boolean = false;

    if (localStorage.getItem("token") != null) {
      ok = true;
    }

    return ok;
  }

}

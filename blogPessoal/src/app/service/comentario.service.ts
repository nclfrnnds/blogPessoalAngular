import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    private http: HttpClient
  ) { }

  serverPort = environment.server + environment.port;

  token = {
    headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")
  }

  getAllComentario(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.serverPort}/comentarios`, this.token);
  }

  getByIdComentario(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.serverPort}/comentarios/${id}`, this.token);
  }

  postComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.serverPort}/comentarios`, comentario, this.token);
  }

  putComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.serverPort}/comentarios`, comentario, this.token);
  }

  deleteComentario(id: number) {
    return this.http.delete(`${this.serverPort}/comentarios/${id}`, this.token);
  }

}

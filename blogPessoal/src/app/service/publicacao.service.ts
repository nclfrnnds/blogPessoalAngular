import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Publicacao } from '../model/Publicacao';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(
    private http: HttpClient
  ) { }

  serverPort = environment.server + environment.port;

  token = {
    headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")
  }

  getAllPublicacao(): Observable<Publicacao[]> {
    return this.http.get<Publicacao[]>(`${this.serverPort}/publicacoes`, this.token);
  }

  getByIdPublicacao(id: number): Observable<Publicacao> {
    return this.http.get<Publicacao>(`${this.serverPort}/publicacoes/${id}`, this.token);
  }

  getByTituloPublicacao(titulo: string): Observable<Publicacao[]> {
    return this.http.get<Publicacao[]>(`${this.serverPort}/publicacoes/titulo/${titulo}`, this.token);
  }

  postPublicacao(publicacao: Publicacao): Observable<Publicacao> {
    return this.http.post<Publicacao>(`${this.serverPort}/publicacoes`, publicacao, this.token);
  }

  putPublicacao(publicacao: Publicacao): Observable<Publicacao> {
    return this.http.put<Publicacao>(`${this.serverPort}/publicacoes`, publicacao, this.token);
  }

  deletePublicacao(id: number) {
    return this.http.delete(`${this.serverPort}/publicacoes/${id}`, this.token);
  }

}

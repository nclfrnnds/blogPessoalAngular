import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  serverPort = environment.server + environment.port;

  token = {
    headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")
  }

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.serverPort}/temas`, this.token);
  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.serverPort}/temas/${id}`, this.token);
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${this.serverPort}/temas`, tema, this.token);
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.serverPort}/temas`, tema, this.token);
  }

  deleteTema(id: number) {
    return this.http.delete(`${this.serverPort}/temas/${id}`, this.token);
  }

}

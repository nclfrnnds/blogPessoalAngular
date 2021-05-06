import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  serverPort = environment.server + environment.port;

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.serverPort}/temas`, this.token);
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${this.serverPort}/temas`, tema, this.token);
  }

  

}
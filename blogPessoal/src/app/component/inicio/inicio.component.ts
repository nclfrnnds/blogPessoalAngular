import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  tituloPostagem: string;

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  nomeTema: string;

  usuario: Usuario = new Usuario();
  idUsuario = environment.id;

  key = "data";
  reverse = true;

  ngOnInit() {

    window.scroll(0,0);

    if (localStorage.getItem("token") == null) {
      this.alertas.showAlertInfo("Sua seção expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.findAllTemas();
    this.findAllPostagens();

  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((response: Tema[]) => {
      this.listaTemas = response;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((response: Tema) => {
      this.tema = response;
    });
  }

  findAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((response: Postagem[]) => {
      this.listaPostagens = response;
    });
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((response: Usuario) => {
      this.usuario = response;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService.postPostagem(this.postagem).subscribe((response: Postagem) => {
      this.postagem = response;
      this.alertas.showAlertSuccess("Postagem realizada com sucesso!");
      this.findAllPostagens();
      this.findAllTemas();
      this.postagem = new Postagem();
    });
  }

  findByTituloPostagem() {
    if (this.tituloPostagem == "") {
      this.findAllPostagens();
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPostagem).subscribe((response: Postagem[]) => {
        this.listaPostagens = response;
      });
    }
  }

findByNomeTema() {
  if (this.nomeTema == "") {
    this.findAllTemas();
  } else {
    this.temaService.getByNomeTema(this.nomeTema).subscribe((response: Tema[]) => {
      this.listaTemas = response;
    });
  }
}

}

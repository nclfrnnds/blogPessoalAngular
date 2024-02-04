import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacao } from 'src/app/model/Publicacao';
import { Comentario } from 'src/app/model/Comentario';
import { Tema } from 'src/app/model/Tema';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PublicacaoService } from 'src/app/service/publicacao.service';
import { ComentarioService } from 'src/app/service/comentario.service';
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
    private publicacaoService: PublicacaoService,
    private comentarioService: ComentarioService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  publicacao: Publicacao = new Publicacao();
  listaPublicacoes: Publicacao[];
  tituloPublicacao: string;

  comentario: Comentario = new Comentario();
  listaComentarios: Comentario[];

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
      this.alertas.showAlertInfo("Sua sessão expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.findAllTemas();
    this.findAllPublicacoes();

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

  findAllPublicacoes() {
    this.publicacaoService.getAllPublicacao().subscribe((response: Publicacao[]) => {
      this.listaPublicacoes = response;
    });
  }

    findAllComentarios() {
    this.comentarioService.getAllComentario().subscribe((response: Comentario[]) => {
      this.listaComentarios = response;
    });
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((response: Usuario) => {
      this.usuario = response;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.publicacao.tema = this.tema;

    this.usuario.id = this.idUsuario;
    this.publicacao.usuario = this.usuario;

    this.publicacaoService.postPublicacao(this.publicacao).subscribe((response: Publicacao) => {
      this.publicacao = response;
      this.alertas.showAlertSuccess("Publicacao realizada com sucesso!");
      this.findAllPublicacoes();
      this.findAllTemas();
      this.publicacao = new Publicacao();
    });
  }

  findByTituloPublicacao() {
    if (this.tituloPublicacao == "") {
      this.findAllPublicacoes();
    } else {
      this.publicacaoService.getByTituloPublicacao(this.tituloPublicacao).subscribe((response: Publicacao[]) => {
        this.listaPublicacoes = response;
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

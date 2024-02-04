import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacao } from 'src/app/model/Publicacao';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PublicacaoService } from 'src/app/service/publicacao.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-publicacao-edit',
  templateUrl: './publicacao-edit.component.html',
  styleUrls: ['./publicacao-edit.component.css']
})
export class PublicacaoEditComponent implements OnInit {

  constructor(
    private publicacaoService: PublicacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  publicacao: Publicacao = new Publicacao();

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;

  ngOnInit() {

    window.scroll(0,0);

    if (localStorage.getItem("token") == null) {
      this.alertas.showAlertInfo("Sua sessão expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    let id = this.route.snapshot.params["id"];
    this.findByIdPublicacao(id);
    this.findAllTemas();

  }

  findByIdPublicacao(id: number) {
    this.publicacaoService.getByIdPublicacao(id).subscribe((response: Publicacao) => {
      this.publicacao = response;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((response: Tema) => {
      this.tema = response;
    });
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((response: Tema[]) => {
      this.listaTemas = response;
    });
  }

  atualizar() {
    this.tema.id = this.idTema;
    this.publicacao.tema = this.tema;

    this.publicacaoService.putPublicacao(this.publicacao).subscribe((response: Publicacao) => {
      this.publicacao = response;
      this.alertas.showAlertSuccess("Publicacao atualizada com sucesso!");
      this.router.navigate(["/inicio"]);
    });
  }

}

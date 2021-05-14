import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  postagem: Postagem = new Postagem();

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
    this.findByIdPostagem(id);
    this.findAllTemas();

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((response: Postagem) => {
      this.postagem = response;
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
    this.postagem.tema = this.tema;

    this.postagemService.putPostagem(this.postagem).subscribe((response: Postagem) => {
      this.postagem = response;
      this.alertas.showAlertSuccess("Postagem atualizada com sucesso!");
      this.router.navigate(["/inicio"]);
    });
  }

}

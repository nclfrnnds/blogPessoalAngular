import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  postagem: Postagem = new Postagem();
  idPostagem: number;

  ngOnInit() {

    window.scroll(0,0);

    if (localStorage.getItem("token") == null) {
      this.alertas.showAlertInfo("Sua sessão expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.idPostagem = this.route.snapshot.params["id"];
    this.findByIdPostagem(this.idPostagem);

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((response: Postagem) => {
      this.postagem = response;
    });
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      this.alertas.showAlertSuccess("Postagem apagada com sucesso!");
      this.router.navigate(["/inicio"]);
    });
  }

}

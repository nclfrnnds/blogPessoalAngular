import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacao } from 'src/app/model/Publicacao';
import { AlertasService } from 'src/app/service/alertas.service';
import { PublicacaoService } from 'src/app/service/publicacao.service';

@Component({
  selector: 'app-publicacao-delete',
  templateUrl: './publicacao-delete.component.html',
  styleUrls: ['./publicacao-delete.component.css']
})
export class PublicacaoDeleteComponent implements OnInit {

  constructor(
    private publicacaoService: PublicacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  publicacao: Publicacao = new Publicacao();
  idPublicacao: number;

  ngOnInit() {

    window.scroll(0,0);

    if (localStorage.getItem("token") == null) {
      this.alertas.showAlertInfo("Sua sessão expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.idPublicacao = this.route.snapshot.params["id"];
    this.findByIdPublicacao(this.idPublicacao);

  }

  findByIdPublicacao(id: number) {
    this.publicacaoService.getByIdPublicacao(id).subscribe((response: Publicacao) => {
      this.publicacao = response;
    });
  }

  apagar() {
    this.publicacaoService.deletePublicacao(this.idPublicacao).subscribe(() => {
      this.alertas.showAlertSuccess("Publicacao apagada com sucesso!");
      this.router.navigate(["/inicio"]);
    });
  }

}

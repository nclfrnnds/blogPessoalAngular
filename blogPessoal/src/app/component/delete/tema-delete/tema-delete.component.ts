import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  tema: Tema = new Tema();
  idTema: number;

  ngOnInit() {

    window.scroll(0,0);

    if (localStorage.getItem("token") == null) {
      this.alertas.showAlertInfo("Sua seção expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.idTema = this.route.snapshot.params["id"];
    this.findByIdTema(this.idTema);

  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((response: Tema) => {
      this.tema = response;
    });
  }

  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      this.alertas.showAlertSuccess("Tema apagado com sucesso!");
      this.router.navigate(["/tema"]);
    });
  }

}

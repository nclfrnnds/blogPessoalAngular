import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  tema: Tema = new Tema();

  ngOnInit() {

    window.scroll(0,0);

    if (localStorage.getItem("token") == null) {
      this.alertas.showAlertInfo("Sua seção expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    let id = this.route.snapshot.params["id"];
    this.findByIdTema(id);

  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((response: Tema) => {
      this.tema = response;
    });
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe((response: Tema) => {
      this.tema = response;
      this.alertas.showAlertSuccess("Tema atualizado com sucesso!");
      this.router.navigate(["/tema"]);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  tema: Tema = new Tema();
  listaTemas: Tema[];

  ngOnInit() {

    window.scroll(0,0);

    if (localStorage.getItem("token") == null) {
      this.alertas.showAlertInfo("Sua seção expirou! Faça o login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.findAllTemas();

  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((response: Tema[]) => {
      this.listaTemas = response;
    });
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((response: Tema) => {
      this.tema = response;
      this.alertas.showAlertSuccess("Tema cadastrado com sucesso!");
      this.findAllTemas();
      this.tema = new Tema();
    });
  }

}

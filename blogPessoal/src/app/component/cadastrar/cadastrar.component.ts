import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/service/alertas.service';
import { Usuario } from '../../model/Usuario';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  usuario: Usuario = new Usuario;
  senha: string;
  tipo: string;

  ngOnInit() {
    window.scroll(0,0);
  }

  confirmarSenha(event: any) {
    this.senha = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipo = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipo;

    if (this.usuario.senha != this.senha) {
      this.alertas.showAlertDanger("As senhas não coincidem.")
    }
    else {
      this.authService.cadastrar(this.usuario).subscribe((response: Usuario) => {
        this.usuario = response;
        this.router.navigate(["/entrar"]);
        this.alertas.showAlertSuccess("Usuário cadastrado com sucesso.");
      });
    }
  }

}

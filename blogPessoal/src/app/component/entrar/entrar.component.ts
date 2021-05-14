import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/service/alertas.service';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../../model/UsuarioLogin';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  usuarioLogin: UsuarioLogin = new UsuarioLogin;

  ngOnInit() {
    window.scroll(0,0);
    
    setTimeout(() => {
      this.limpar();
    });
  }

  entrar() {
    this.authService.entrar(this.usuarioLogin).subscribe((response: UsuarioLogin) => {
      this.usuarioLogin = response;

      localStorage.setItem("token", this.usuarioLogin.token);
      environment.nome = this.usuarioLogin.nome;
      environment.foto = this.usuarioLogin.foto;
      environment.id = this.usuarioLogin.id;
      environment.tipo = this.usuarioLogin.tipo;

      this.router.navigate(["/inicio"]);
    }, err => {
      if(err.status == 500) {
        this.alertas.showAlertDanger("Usuário ou senha estão incorretos!")
      }
    });
  }

  limpar() {
    localStorage.removeItem("token");
    environment.id = 0;
    environment.nome = "";
    environment.foto = "";
    environment.tipo = "";
  }

}

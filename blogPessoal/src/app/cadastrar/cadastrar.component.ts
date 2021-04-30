import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario;
  senha: string;
  tipo: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
      alert("As senhas não coincidem.")
    }
    else {
      this.authService.cadastrar(this.usuario).subscribe((response: Usuario) => {
        this.usuario = response;
        this.router.navigate(["/entrar"]);
        alert("Usuário cadastrado com sucesso.");
      });
    }

  }

}

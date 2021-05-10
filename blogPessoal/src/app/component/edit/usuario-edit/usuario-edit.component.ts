import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario();
  senha: string;
  tipo: string;
  idUsuario: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == "") {
      this.router.navigate(["/entrar"]);
    }

    this.idUsuario = this.route.snapshot.params["id"];
    this.findByIdUsuario(this.idUsuario);

  }

  confirmarSenha(event: any) {
    this.senha = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipo = event.target.value;
  }

  atualizar() {
    this.usuario.tipo = this.tipo;

    if (this.usuario.senha != this.senha) {
      alert("As senhas não coincidem.")
    }
    else {
      this.authService.cadastrar(this.usuario).subscribe((response: Usuario) => {
        this.usuario = response;
        this.router.navigate(["/inicio"]);
        alert("Usuário atualizado com sucesso. Faça o login novamente!");
        environment.token = "";
        environment.nome = "";
        environment.foto = "";
        environment.id = 0;
        this.router.navigate(["/entrar"]);
      });
    }
  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((response: Usuario) => {
      this.usuario = response;
    });
  }

}

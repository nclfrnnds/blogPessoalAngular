import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './component/cadastrar/cadastrar.component';
import { EntrarComponent } from './component/entrar/entrar.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { TemaComponent } from './component/tema/tema.component';
import { TemaDeleteComponent } from './component/delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './component/edit/tema-edit/tema-edit.component';
import { PublicacaoEditComponent } from './component/edit/publicacao-edit/publicacao-edit.component';
import { PublicacaoDeleteComponent } from './component/delete/publicacao-delete/publicacao-delete.component';
import { UsuarioEditComponent } from './component/edit/usuario-edit/usuario-edit.component';

const routes: Routes = [

  {path: "", redirectTo: "entrar", pathMatch: "full"},

  {path: "entrar", component: EntrarComponent},
  {path: "cadastrar", component: CadastrarComponent},
  {path: "inicio", component: InicioComponent},
  {path: "usuario-edit/:id", component: UsuarioEditComponent},

  {path: "publicacao-edit/:id", component: PublicacaoEditComponent},
  {path: "publicacao-delete/:id", component: PublicacaoDeleteComponent},

  {path: "tema", component: TemaComponent},
  {path: "tema-edit/:id", component: TemaEditComponent},
  {path: "tema-delete/:id", component: TemaDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

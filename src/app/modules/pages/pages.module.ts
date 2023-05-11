import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TesorosComponent } from './tesoros/tesoros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { JugadoresComponent } from './jugadores/jugadores.component';




@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    PerfilComponent,
    TesorosComponent,
    UsuariosComponent,
    JugadoresComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ]
})
export class PagesModule { }

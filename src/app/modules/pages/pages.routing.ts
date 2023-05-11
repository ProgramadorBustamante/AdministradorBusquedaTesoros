import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { PerfilComponent } from './perfil/perfil.component

// Mantenimientos
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TesorosComponent } from './tesoros/tesoros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { JugadoresComponent } from './jugadores/jugadores.component';

const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'tesoros', component: TesorosComponent, data: {titulo: 'Tesoros'} },
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'} },
      { path: 'jugadores', component: JugadoresComponent, data: {titulo: 'Jugadores'} },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

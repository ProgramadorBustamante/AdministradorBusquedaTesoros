import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './modules/nopagefound/nopagefound.component';
import { AuthRoutingModule } from './modules/auth/auth.routing';
import { PagesRoutingModule } from './modules/pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: 'main/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

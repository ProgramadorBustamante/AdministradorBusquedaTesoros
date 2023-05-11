import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afa: AngularFireAuth, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
        this.afa.onAuthStateChanged((user: any) => {
          if (user) {
          resolve(true);
          } else {
          this.router.navigate([ '/login' ], { queryParams: { returnUrl: state.url } });
          resolve(false);
          }
        });
      });
    };
}

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// Lo que hace es lanzar un efecto secundario, paso adicional
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../interfaces/user.interface';

import Swal from 'sweetalert2';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // public usuario!: fIRE;

  // constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {}

  userData: any; // Save logged in user data
  usuario: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    }
  }


  crearUsuario(formData: RegisterForm) {
    return this.afAuth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then((result) => {
        result.user?.updateProfile({ displayName :  formData.nombre});
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();

        localStorage.setItem('token',"aqui va el menu");

        this.usuario = result.user;


        this.usuario = result.user

        return true;

      })
      .catch((error) => {
        window.alert(error.message);
      });

  }

  actualizarPerfil(data: {email: string, nombre: string, role: any}){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.afs.collection('users').doc(this.uid).set(data);
  }
  
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }


  login(formData: any) {
    debugger
    return this.afAuth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((result) => {
      this.usuario =  result.user
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['main','dashboard']);
          }
        });
        return true;
      })
      .catch((error) => {
        Swal.fire('Atención',"Usuario o contraseña incorrectos", 'error');
        return false;
      });
  }


  logout() {
    localStorage.removeItem('token');

    // Salir de la cuenta google
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    });
    
  }


}

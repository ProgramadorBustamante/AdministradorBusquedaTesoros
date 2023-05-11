import { Component } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario!: any;

  constructor(private usuarioService: UsuarioService,private afa : AngularFireAuth){
    this.afa.authState.subscribe(c=> {
      this.usuario = {
         nombre: c?.displayName || "",
         email: c?.email || ""
      } 
    })
  }

  logout(){
    this.usuarioService.logout();
  }

}

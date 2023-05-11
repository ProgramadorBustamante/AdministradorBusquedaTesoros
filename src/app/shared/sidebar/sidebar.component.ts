import { Component } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario.model';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems!: any[];
  public usuario!: any;

  constructor(private usuarioService: UsuarioService,private afa : AngularFireAuth){
    this.afa.currentUser.then(c=> {
      this.usuario = c
    })
  }

  // constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService){

  //   this.menuItems = this.sidebarService.menu;
  //   this.usuario = usuarioService.usuario;
  //     constructor(private usuarioService: UsuarioService,private afa : AngularFireAuth){
  //   this.afa.authState.subscribe(c=> {
  //     this.usuario = {
  //        nombre: c?.displayName || "",
  //        email: c?.email || ""
  //     } 
  //   })
  // }
  // }

  public imgUrl = '';


}

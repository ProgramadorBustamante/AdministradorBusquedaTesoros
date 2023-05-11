import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/models/usuario.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private usuarioSerive: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioSerive.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    // this.usuarioSerive.actualizarPerfil(this.perfilForm.value).subscribe(
    //   () => {
    //     const { nombre, email } = this.perfilForm.value;
    //     this.usuario.nombre = nombre;
    //     this.usuario.email = email;
    //     Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
    //   },
    //   (err) => {
    //     Swal.fire('Error', err.error.msg, 'error');
    //   }
    // );
  }

  cambiarImagen(event: any): any {
    var file: File;

    file = event.target.files[0];
    console.log(file);

    this.imagenSubir = file;

    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    };
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then((img : any ) => {
        this.usuario.img = img;
        Swal.fire('Imagen guardada', 'Imagen de usuario actualizada', 'success');
      }).catch((err : any ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router){}

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: [true, [Validators.required]],
  }, {
    validators: this.passwordIguales('password', 'password2')
  })

  crearusuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid){
      return
    }

    // Realizar la creación del usuario
    this.usuarioService.crearUsuario(this.registerForm.value)
      .then(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

  campoNoValido(campo:string): boolean {
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;

    if (pass1 !== pass2 && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control!.value === pass2Control!.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }

}

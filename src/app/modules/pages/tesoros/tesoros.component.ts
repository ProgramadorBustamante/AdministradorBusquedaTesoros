import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TesorosService } from 'src/app/core/services/tesoros.service';

@Component({
  selector: 'app-tesoros',
  templateUrl: './tesoros.component.html',
  styleUrls: ['./tesoros.component.css']
})
export class TesorosComponent {


  show: boolean =  false;

  frmTesoro = new FormGroup({
    titulo : new FormControl('',Validators.required),
    descripcion : new FormControl('',Validators.required),
    pista : new FormControl('',Validators.required),
    acertijo : new FormControl('',Validators.required),
    respuestaAcertijo : new FormControl('',Validators.required),
    lat: new FormControl('',Validators.required),
    long: new FormControl('',Validators.required),
    puntos: new FormControl('',Validators.required),
    minPuntos: new FormControl('',Validators.required),
  })

constructor( private tesorosServ : TesorosService){

}


  OpenModal(){
    console.log(this.show);
    
    this.show = !this.show;
  }


  Guardar(){
    if(this.frmTesoro.invalid){
      alert("Completa toda la información")
    }

    this.tesorosServ.Agregar(this.frmTesoro.value);


  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TesorosService } from 'src/app/core/services/tesoros.service';

@Component({
  selector: 'app-tesoros',
  templateUrl: './tesoros.component.html',
  styleUrls: ['./tesoros.component.css'],
})
export class TesorosComponent implements OnInit {
  show: boolean = false;

  @ViewChild('closeModal') closeModal: ElementRef<HTMLElement>;

  frmTesoro = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    pista: new FormControl('', Validators.required),
    acertijo: new FormControl('', Validators.required),
    respuestaAcertijo: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    long: new FormControl('', Validators.required),
    puntos: new FormControl('', Validators.required),
    minPuntos: new FormControl('', [Validators.required]),
  });
  tesoros: any[] = [];

  constructor(private tesorosServ: TesorosService) {}

  ngOnInit(): void {
   
    this.obtenerTesoros();
    
  }


  OpenModal() {
    console.log(this.show);

    this.show = !this.show;
  }

  Guardar() {
    if (this.frmTesoro.invalid) {
      alert('Completa toda la información');
    }

    if(this.frmTesoro.value.id){
      this.agregarTesoro();
    }else{
      this.editarTesoro();
    }

  
  }

  agregarTesoro( ){
    this.tesorosServ
    .Agregar(this.frmTesoro.value)
    .then((res) => {
      if (res === true) {
        alert('Se guardo con exito');
        this.closeModal.nativeElement.click();
        this.obtenerTesoros();
        this.frmTesoro.reset();
      } else {
        alert('Ocurrio un error al almacenar');
      }
    })
    .catch((err) => {
      alert('Lo sentimos no se pudo procesar la petición');
    });
  }
  editarTesoro( ){
    this.tesorosServ
    .editar(this.frmTesoro.value,this.frmTesoro.value.id)
    .then((res) => {
      if (res === true) {
        alert('Se guardo con exito');
        this.closeModal.nativeElement.click();
        this.obtenerTesoros();
        this.frmTesoro.reset();
      } else {
        alert('Ocurrio un error al almacenar');
      }
    })
    .catch((err) => {
      alert('Lo sentimos no se pudo procesar la petición');
    });
  }




  obtenerTesoros(){
    this.tesoros = [];
    this.tesorosServ.ObtenerTodos().subscribe(c=>{
      c.docs.map(doc=>{
        this.tesoros.push({ id : doc.id , data : doc.data()  })
      })
    })
  }

  eliminarTesoro(tesoro : any ){
   let  confirm = window.confirm("Estas seguro que deseas eliminar el tesoro");
   if(confirm){
    this.tesorosServ.Eliminar(tesoro.id).then((c :  any )=>{
      console.log(c);
      if(c === true){
        alert("Se elimino correctamente")
        this.obtenerTesoros();
      }
        else{
          alert("Ocurrio un error")
        }
    })
   } 
  }

  editar(tesoro : any){
    this.frmTesoro.patchValue(tesoro.data);
    this.frmTesoro.patchValue({ id : tesoro.id});
  }

}

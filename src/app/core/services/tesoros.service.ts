import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TesorosService {

  constructor(public afs: AngularFirestore,  public afAuth: AngularFireAuth)
  {

  }

  ObtenerTodos(){

  }

  Agregar(data : any ){
  
    this.afs.collection("tesoros").add({...data})

  }



}

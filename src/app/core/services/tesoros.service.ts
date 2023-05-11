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
   return this.afs.collection("tesoros").get();
  }

  async Agregar(data : any ){
    
  
   return await   this.afs.collection("tesoros").add({...data}).then(c=>{
    return true;
   }).catch(err=> err)

  }

  async editar(data : any , id : any  ){
    
  
    return await   this.afs.collection("tesoros").doc(id).set({...data}).then(c=>{
     return true;
    }).catch(err=> err)
 
   }

  async Eliminar(id : any ){
   return await  this.afs.collection("tesoros").doc(id).delete().then(c=>{
      return true;
     })
     .catch(err=> {
      return err
     })
  }



}

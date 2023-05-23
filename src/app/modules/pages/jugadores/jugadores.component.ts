import { Component, OnInit } from '@angular/core';
import { TesorosService } from 'src/app/core/services/tesoros.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  jugadores: any[] = [];


  constructor(private tesoroServ : TesorosService){

  }
  ngOnInit(){
    this.getJugadores();
  }

  getJugadores(){
    this.tesoroServ.getUsers().subscribe(c=>{
      console.log(c);
      
      c.docs.map(c=>{
        this.jugadores.push({ id : c.id , data : c.data()})
      })
    })
  }

}

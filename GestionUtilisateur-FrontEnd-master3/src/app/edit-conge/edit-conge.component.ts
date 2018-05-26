import { Component, OnInit } from '@angular/core';
import {Conge} from '../../model/model.conge';
import {CongeServices} from '../../services/conge.services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-conge',
  templateUrl: './edit-conge.component.html',
  styleUrls: ['./edit-conge.component.css']
})
export class EditCongeComponent implements OnInit {
  mode:number=1;
  conge:Conge=new Conge();
  idCong:number=0;

  constructor(public activatedRoute:ActivatedRoute,
              public congeService:CongeServices,
              public router:Router) {
    this.idCong=activatedRoute.snapshot.params['idCong'];
  }

  ngOnInit() {
    this.congeService.getConge(this.idCong)
      .subscribe(data=> {
        this.conge = data;
      },err=>{
        console.log(err);
      })
  }
  updateConge(){
    this.congeService.updateConge(this.conge)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['conge']);
      },err=>{
        console.log(err);
        alert("Problème");
      })
  }

}


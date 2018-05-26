import { Component, OnInit } from '@angular/core';
import {TypeConge} from '../../model/model.typeConge';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeCongeServices} from '../../services/typeConge.services';


@Component({
  selector: 'app-edit-type-conge',
  templateUrl: './edit-type-conge.component.html',
  styleUrls: ['./edit-type-conge.component.css']
})
export class EditTypeCongeComponent implements OnInit {
  typeConge:TypeConge=new TypeConge();
  idCg:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public typeCongeService:TypeCongeServices,
              public router:Router) {
    this.idCg=activatedRoute.snapshot.params['idCg'];
  }

  ngOnInit() {
    this.typeCongeService.getTypeConge(this.idCg)
      .subscribe(data=> {
        this.typeConge = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateTypeConge(){
    this.typeCongeService.updateTypeConge(this.typeConge)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['typeConge']);
      },err=>{
        console.log(err);
        alert("Problème");
      })
  }


}

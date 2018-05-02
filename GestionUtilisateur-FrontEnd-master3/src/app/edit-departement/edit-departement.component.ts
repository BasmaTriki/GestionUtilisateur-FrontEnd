import { Component, OnInit } from '@angular/core';
import {Departement} from "../../model/model.departement";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartementServices} from "../../services/departement.services";

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnInit {
  departement:Departement=new Departement();
  idDep:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public departementService:DepartementServices,
              public router:Router)
  {
    this.idDep=activatedRoute.snapshot.params['idDep'];
  }

  ngOnInit() {
    this.departementService.getDepartement(this.idDep)
      .subscribe(data=> {
        this.departement = data;
      },err=>{
        console.log(err);
      })
  }
  updateDepartement(){
    this.departementService.updateDepartement(this.departement)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['departement']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }

}

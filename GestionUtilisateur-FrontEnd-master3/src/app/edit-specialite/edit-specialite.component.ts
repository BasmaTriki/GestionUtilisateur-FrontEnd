import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SpecialiteServices} from "../../services/specialite.services";
import {Specialite} from "../../model/model.specialite";

@Component({
  selector: 'app-edit-specialite',
  templateUrl: './edit-specialite.component.html',
  styleUrls: ['./edit-specialite.component.css']
})
export class EditSpecialiteComponent implements OnInit {
specialite:Specialite;
idSp:number;
  constructor(public activatedRoute:ActivatedRoute,
              public specialiteService:SpecialiteServices,
              public router:Router)
  {
    this.idSp=activatedRoute.snapshot.params['idSp'];
  }

  ngOnInit() {
    this.specialiteService.getSpecialite(this.idSp)
      .subscribe(data=> {
        this.specialite = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateSpecialite(){
    this.specialiteService.updateSpecialite(this.specialite)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['specialite']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }
}

import { Component, OnInit } from '@angular/core';
import {CongeServices} from "../../services/conge.services";
import {ActivatedRoute, Router} from "@angular/router";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";

@Component({
  selector: 'app-details-enseignant',
  templateUrl: './details-enseignant.component.html',
  styleUrls: ['./details-enseignant.component.css']
})
export class DetailsEnseignantComponent implements OnInit {
enseignantP:EnseignantPermanent=new EnseignantPermanent();
matricule=this.activatedRoute.snapshot.params['matricule'];
  constructor(public activatedRoute:ActivatedRoute,
              public enseignantpService:EnseignantPermanentServices,
              public router:Router) { }

  ngOnInit() {

    this.enseignantpService.getEnseignantPermanent(this.matricule)
      .subscribe(data=> {
        this.enseignantP = data;
      },err=>{
        console.log(err);
      })}

}

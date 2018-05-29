import { Component, OnInit } from '@angular/core';
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import {Mutation} from "../../model/model.mutation";
import {EditEnseignantPermanentComponent} from "../edit-enseignant-permanent/edit-enseignant-permanent.component";

@Component({
  selector: 'app-liste-enseignant-permanent',
  templateUrl: './liste-enseignant-permanent.component.html',
  styleUrls: ['./liste-enseignant-permanent.component.css']
})
export class ListeEnseignantPermanentComponent implements OnInit {
  enseignantPs:Array<EnseignantPermanent> = new Array<EnseignantPermanent>();
  pages: Array<number>;
  pageEnseignant:any;
  constructor(private enseingnantpermanentService:EnseignantPermanentServices, public http: Http, public router: Router) { }

  ngOnInit() {
    this.chercherEnseignant();
  }
  chercherEnseignant()
  {
    this.enseingnantpermanentService.getAllEnseignantPermanents()
      .subscribe(data=>{
        this.enseignantPs=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  onEditEnseignant(matricule:number){
    this.router.navigate(['EditEnseignantP',matricule]);
  }
  onDetailsEnseignant(matricule:number) {
    this.router.navigate(['DetailsEnseignantP',matricule]);

  }
}

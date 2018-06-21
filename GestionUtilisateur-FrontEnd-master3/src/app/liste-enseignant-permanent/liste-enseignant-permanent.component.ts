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
  motCle:string="";
  currentPage:number=0;
  size:number=5;
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
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearch();
  }
  doSearch(){
    this.enseingnantpermanentService.getEnseignantPermanents(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageEnseignant=data;
        this.pages=new Array(data.totalPages);
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

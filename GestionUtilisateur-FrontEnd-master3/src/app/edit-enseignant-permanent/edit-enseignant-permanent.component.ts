import { Component, OnInit } from '@angular/core';
import {Enfant} from "../../model/model.enfant";
import {PosteAdministrative} from "../../model/model.posteAdministrative";
import {AGrade} from "../../model/model.agrade";
import {Departement} from "../../model/model.departement";
import {Grade} from "../../model/model.grade";
import {Corps} from "../../model/model.corps";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import {AGradeServices} from "../../services/agrade.services";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {Http} from "@angular/http";
import {PosteAdministrativeServices} from "../../services/posteAdministrative.services";
import {ActivatedRoute, Router} from "@angular/router";
import {GradeServices} from "../../services/grade.services";
import {CorpsServices} from "../../services/corps.services";
import {EnfantServices} from "../../services/enfant.services";
import {DepartementServices} from "../../services/departement.services";

@Component({
  selector: 'app-edit-enseignant-permanent',
  templateUrl: './edit-enseignant-permanent.component.html',
  styleUrls: ['./edit-enseignant-permanent.component.css']
})
export class EditEnseignantPermanentComponent implements OnInit {
  enseignantP: EnseignantPermanent = new EnseignantPermanent();
  departements: Array<Departement> = new Array<Departement>();
  grades: Array<Grade> = new Array<Grade>();
  corps: Array<Corps> = new Array<Corps>();
  postes:Array<PosteAdministrative>=new Array<PosteAdministrative>();
  departement:Departement;
  poste:PosteAdministrative;
  panelOpenState: boolean = false;
  agrade:AGrade=new AGrade();
  grade:Grade=new Grade();
  corp:Corps=new Corps();
  nbEnfant:number;
  enfants:Array<Enfant>;
  matricule:number;
  constructor(public activatedRoute:ActivatedRoute,private agradeServices:AGradeServices,private posteService:PosteAdministrativeServices,private gradeServices: GradeServices,private corpsServices: CorpsServices,private enseingnantpermanentService:EnseignantPermanentServices, private enfantservice: EnfantServices, private departementServices: DepartementServices, public http: Http, public router: Router)
  {
    this.matricule=activatedRoute.snapshot.params['matricule'];
  }

  ngOnInit() {
    this.enseingnantpermanentService.getEnseignantPermanent(this.matricule)
      .subscribe(data=>{
        this.enseignantP=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
    this.chercherDep();
    this.chercherGrad();
    this.chercherCorp();
    this. chercherPoste();
    this.enfants==new Array<Enfant>(this.nbEnfant);
  }
  chercherPoste()
  {
    this.posteService.getAllPostes()
      .subscribe(data=>{
        this.postes=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateEnseignant() {
    this.enseignantP.departement=this.departement;
    this.enseignantP.corps=this.corp;
    this.enseingnantpermanentService.updateEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Mise à jour effectuée");
        this.router.navigate(['ListeEnseignantP']);
        console.log(data);
      },err=>{
        console.log(err);
      });
    //this.EnregistrerAgrade();
  }

  annuler() {
  }

  chercherDep() {
    this.departementServices.allDepartements()
      .subscribe(data => {
        this.departements = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }


  chercherGrad()
  {
    this.gradeServices.getAllGrades()
      .subscribe(data=>{
        this.grades=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercherCorp()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corps=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
}

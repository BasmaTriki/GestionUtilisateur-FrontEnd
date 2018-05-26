import { Component, OnInit } from '@angular/core';
import {Enfant} from '../../model/model.enfant';
import {EnfantServices} from '../../services/enfant.services';
import {Grade} from "../../model/model.grade";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import {Http} from "@angular/http";
import {DepartementServices} from "../../services/departement.services";
import {Router} from "@angular/router";
import {Departement} from "../../model/model.departement";
import {GradeServices} from "../../services/grade.services";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {FormControl, NgModel, Validators} from "@angular/forms";
import {Corps} from "../../model/model.corps";
import {CorpsServices} from "../../services/corps.services";
import {PosteAdministrative} from "../../model/model.posteAdministrative";
import {PosteAdministrativeServices} from "../../services/posteAdministrative.services";
import {AGrade} from "../../model/model.agrade";
import {AGradeServices} from "../../services/agrade.services";


@Component({
  selector: 'app-enseignant-permanent',
  templateUrl: './enseignant-permanent.component.html',
  styleUrls: ['./enseignant-permanent.component.css']
})
export class EnseignantPermanentComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  pageEnseignantP: any;
  motCle: string = "";
  currentPage: number = 0;
  pages: Array<number>;
  size: number = 5;
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
  constructor(private agradeServices:AGradeServices,private posteService:PosteAdministrativeServices,private gradeServices: GradeServices,private corpsServices: CorpsServices,private enseingnantpermanentService:EnseignantPermanentServices, private enfantservice: EnfantServices, private departementServices: DepartementServices, public http: Http, public router: Router) {

  }

  ngOnInit() {
    this.chercherDep();
    this.chercherGrad();
    this.chercherCorp();
    this. chercherPoste();
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une valeur' :
      this.email.hasError('email') ? 'Email non valide' :
        '';
  }
  chercherPoste()
  {
    this.posteService.getAllPostes()
      .subscribe(data=>{
        this.postes=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  EnregistrerAgrade() {
    this.agrade.grade = this.grade;
    this.agrade.personnel = this.enseignantP;
    this.agradeServices.saveAGrade(this.agrade)
      .subscribe(data => {
        alert("Success d'ajout");
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
  Enregistrer() {
  this.enseignantP.departement=this.departement;
  this.enseignantP.corps=this.corp;
  //this.enseignantP.pos
  this.enseingnantpermanentService.saveEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Success d'ajout");
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
        this.pages = new Array(data.totalPages);
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

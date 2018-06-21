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
import {Diplome} from "../../model/model.diplome";
import {DiplomePersonnel} from "../../model/model.diplomepersonnel";
import {DiplomeServices} from "../../services/diplome.services";
import {Specialite} from "../../model/model.specialite";
import {SpecialiteServices} from "../../services/specialite.services";
import {DiplomePersonnelServices} from "../../services/diplomepersonnel.services";


@Component({
  selector: 'app-enseignant-permanent',
  templateUrl: './enseignant-permanent.component.html',
  styleUrls: ['./enseignant-permanent.component.css']
})
export class EnseignantPermanentComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  currentPage: number = 0;
  pages: Array<number>;
  size: number = 5;
  enseignantP: EnseignantPermanent = new EnseignantPermanent();
  departements: Array<Departement> = new Array<Departement>();
  grades: Array<Grade> = new Array<Grade>();
  corps: Array<Corps> = new Array<Corps>();
  departement:Departement;
  poste:PosteAdministrative;
  panelOpenState: boolean = false;
  agrade:AGrade=new AGrade();
  grade:Grade=new Grade();
  corp:Corps=new Corps();
  enfants:Array<Enfant>=new Array<Enfant>();
  enfant:Enfant=new Enfant();
  diplomes: Array<Diplome> = new Array<Diplome>();
  diplome:Diplome=new Diplome();
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  specialite:Specialite=new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  constructor(private agradeServices:AGradeServices,
              private posteService:PosteAdministrativeServices,
              private gradeServices: GradeServices,
              private corpsServices: CorpsServices,
              private enseingnantpermanentService:EnseignantPermanentServices,
              private enfantservice: EnfantServices,
              private departementServices: DepartementServices,
              private diplomeService:DiplomeServices,
              private specialiteServices:SpecialiteServices,
              private diplomePServices:DiplomePersonnelServices,
              public http: Http,
              public router: Router) {
  }

  ngOnInit() {
    this.chercherDep();
    this.chercherDip();
    this.chercherGrad();
    this.chercherCorp();
    this.chercherSpecialite();
    this.enfants.push(this.enfant);
    this.diplomep.diplome=this.diplome;
    this.diplomepers.push(this.diplomep);


  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une valeur' :
      this.email.hasError('email') ? 'Email non valide' :
        '';
  }

  chercherSpecialite()
  {
    this.specialiteServices.allSpecialites()
      .subscribe(data=>{
        this.specialites=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercherDip() {
    this.diplomeService.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
        console.log(data);
      }, err => {
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
  EnregistrerDiplomeP(en:EnseignantPermanent) {
    for (let dip of this.diplomepers) {
      dip.personnel = en;
      this.diplomePServices.saveDiplomePersonnel(dip)
        .subscribe(data => {
          console.log("Success d'ajout diplomes");
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }
    EnregistrerEnfant(en:EnseignantPermanent) {
      for(let e of this.enfants)
      {e.personnel=en;
        this.enfantservice.saveEnfant(e)
          .subscribe(data => {
            console.log("Success d'ajout enfant");
            console.log(data);
          }, err => {
            console.log(err);
          });
      }
  }
  Enregistrer() {
  this.enseignantP.departement=this.departement;
  this.enseignantP.corps=this.corp;
  this.enseignantP.specialite=this.specialite;
  //this.enseignantP.pos
  this.enseingnantpermanentService.saveEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        this.EnregistrerDiplomeP(data);
        this.EnregistrerEnfant(data);
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
  ajouterDiplome()
  {console.log(this.diplome);
    this.diplomep.diplome=this.diplome;
    this.diplomepers.push(this.diplomep);
    this.diplome=new Diplome();
  }
  ajouterEnfants()
  {
    this.enfants.push(this.enfant);
  }
}

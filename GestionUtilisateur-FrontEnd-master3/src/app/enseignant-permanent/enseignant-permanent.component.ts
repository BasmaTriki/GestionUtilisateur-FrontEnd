import { Component, OnInit } from '@angular/core';
import {Enfant} from '../../model/model.enfant';
import {EnfantServices} from '../../services/enfant.services';
import {Grade} from "../../model/model.grade";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import {Http} from "@angular/http";
import {DepartementServices} from "../../services/departement.services";
import {Router} from "@angular/router";
import {Departement} from "../../model/model.departement";
import {DiplomeServices} from "../../services/diplome.services";
import {Diplome} from "../../model/model.diplome";
import {GradeServices} from "../../services/grade.services";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";


@Component({
  selector: 'app-enseignant-permanent',
  templateUrl: './enseignant-permanent.component.html',
  styleUrls: ['./enseignant-permanent.component.css']
})
export class EnseignantPermanentComponent implements OnInit {
  pageEnseignantP: any;
  motCle: string = "";
  currentPage: number = 0;
  pages: Array<number>;
  size: number = 5;
  enseignantP: EnseignantPermanent = new EnseignantPermanent();
  departements: Array<Departement> = new Array<Departement>();
  diplomes: Array<Diplome> = new Array<Diplome>();
  grades: Array<Grade> = new Array<Grade>();
  panelOpenState: boolean = false;
  constructor(private gradeServices: GradeServices,private enseingnantpermanentService:EnseignantPermanentServices, private diplomeServices: DiplomeServices, private enfantservice: EnfantServices, private departementServices: DepartementServices, public http: Http, public router: Router) {

  }

  ngOnInit() {
    this.chercherDep();
    this.chercherDip();
    this.chercherGrad();
  }

  Enregistrer() {
    this.enseingnantpermanentService.updateEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
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

  chercherDip() {
    this.diplomeServices.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
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
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  EnregistrerGrade() {
    this.enseingnantpermanentService.updateEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  EnregistrerDep() {
    this.enseingnantpermanentService.updateEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
}

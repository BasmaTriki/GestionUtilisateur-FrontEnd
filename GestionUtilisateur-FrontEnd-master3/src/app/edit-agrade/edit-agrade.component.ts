import { Component, OnInit } from '@angular/core';
import {AGrade} from "../../model/model.agrade";
import {Grade} from "../../model/model.grade";
import {Personnel} from "../../model/model.personnel";
import {GradeServices} from "../../services/grade.services";
import {ActivatedRoute, Router} from "@angular/router";
import {AGradeServices} from "../../services/agrade.services";
import {Http} from "@angular/http";
import {PersonnelServices} from "../../services/personnel.services";

@Component({
  selector: 'app-edit-agrade',
  templateUrl: './edit-agrade.component.html',
  styleUrls: ['./edit-agrade.component.css']
})
export class EditAgradeComponent implements OnInit {
  personnel: Personnel = new Personnel();
  personnels: Array<Personnel> = new Array<Personnel>();
  grades: Array<Grade> = new Array<Grade>();
  grade: Grade = new Grade();
  agrade: AGrade = new AGrade();
  id_agrade:number;
  constructor(private gradeServices: GradeServices, private agradeService: AGradeServices,activatedRoute:ActivatedRoute, private personnelServices: PersonnelServices, public router: Router)
  {
    this.id_agrade=activatedRoute.snapshot.params['id_agrade'];
  }

  ngOnInit() {
    this.agradeService.getAGrade(this.id_agrade)
      .subscribe(data=> {
        this.agrade = data;
      },err=>{
        console.log(err);
      })
    this.AfficherPersonnel();
    this.chercherGrad();
  }
  chercherGrad() {
    this.gradeServices.getAllGrades()
      .subscribe(data => {
        this.grades = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  AfficherPersonnel() {
    this.personnelServices.getAllPersonnel()
      .subscribe(data => {
        this.personnels = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
  update()
  {
    this.agrade.grade = this.grade;
    this.agrade.personnel = this.personnel;
    this.agradeService.updateAGrade(this.agrade)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['Agrade']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }
  annuler()
  {

  }
}

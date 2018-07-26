import { Component, OnInit, Inject } from '@angular/core';
import {Personnel} from "../../model/model.personnel";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {PersonnelServices} from "../../services/personnel.services";
import {AGradeServices} from "../../services/agrade.services";
import {Grade} from "../../model/model.grade";
import {GradeServices} from "../../services/grade.services";
import {AGrade} from "../../model/model.agrade";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-a-grade',
  templateUrl: './a-grade.component.html',
  styleUrls: ['./a-grade.component.css']
})
export class AGradeComponent implements OnInit {
  grades: Array<Grade> = new Array<Grade>();
  grade: Grade = new Grade();
  agrade: AGrade = new AGrade();
  agrades: Array<AGrade> = new Array<AGrade>();
  idGrade:number;

  constructor(private gradeServices: GradeServices,
    public dialogRef: MatDialogRef<AGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private agradeService: AGradeServices, 
    public http: Http, 
    private personnelServices: PersonnelServices,
     public router: Router) {
  }

  ngOnInit() {
    this.idGrade=this.data.num;
    this.chercherGrad();
    this.agradeService.getAGrade(this.idGrade)
    .subscribe(data=>{
    this.agrade=data;
    },err=>{
      console.log(err);
    })
  }

  Enregistrer() {
    this.agrade.grade = this.grade;
    this.agradeService.updateAGrade(this.agrade)
      .subscribe(data => {
        this.Close();
      }, err => {
        console.log(err);
      });
  }

  annuler() {
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
  chercherAGrad() {
    this.agradeService.getAllAGrades()
      .subscribe(data => {
        this.agrades = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  Close()
  {
    this.dialogRef.close();
   
  }
}

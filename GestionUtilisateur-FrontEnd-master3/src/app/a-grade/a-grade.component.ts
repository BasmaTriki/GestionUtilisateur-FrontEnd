import { Component, OnInit } from '@angular/core';
import {Personnel} from "../../model/model.personnel";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {PersonnelServices} from "../../services/personnel.services";
import {AGradeServices} from "../../services/agrade.services";
import {Grade} from "../../model/model.grade";
import {GradeServices} from "../../services/grade.services";
import {AGrade} from "../../model/model.agrade";


@Component({
  selector: 'app-a-grade',
  templateUrl: './a-grade.component.html',
  styleUrls: ['./a-grade.component.css']
})
export class AGradeComponent implements OnInit {
  pageAgrade: any;
  motCle: string = "";
  currentPage: number = 0;
  size: number = 5;
  pages: Array<number>;
  personnel: Personnel = new Personnel();
  personnels: Array<Personnel> = new Array<Personnel>();
  grades: Array<Grade> = new Array<Grade>();
  grade: Grade = new Grade();
  grade1: Grade = new Grade();
  agrade: AGrade = new AGrade();
  agrades: Array<AGrade> = new Array<AGrade>();

  constructor(private gradeServices: GradeServices, private agradeService: AGradeServices, public http: Http, private personnelServices: PersonnelServices, public router: Router) {
  }

  ngOnInit() {
    this.AfficherPersonnel();
    this.chercherGrad();
    this.chercherAGrad();
  }

  Enregistrer() {
    this.agrade.grade = this.grade;
    this.agrade.personnel = this.personnel;
    this.agradeService.saveAGrade(this.agrade)
      .subscribe(data => {
        alert("Success d'ajout");
        console.log(data);
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
  AfficherPersonnel() {
    this.personnelServices.getAllPersonnel()
      .subscribe(data => {
        this.personnels = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearch();
  }
  doSearch(){
    this.agradeService.getAGrades(this.grade1.titre,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageAgrade=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  onEditAgrade(id_agrade: number) {
    this.router.navigate(['editAgrade', id_agrade]);
  }

  onDeleteAgrade(ag: AGrade) {
    let confirm = window.confirm("Etes-vous sûre?");
    if (confirm == true) {
      this.agradeService.deleteAGrade(ag.id_agrade)
        .subscribe(data => {
          this.pageAgrade.content.splice(
            this.pageAgrade.content.indexOf(ag), 1
          );
        }, err => {
          console.log(err);
        })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {Grade} from "../../model/model.grade";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {GradeServices} from "../../services/grade.services";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  pageGrade:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  grade:Grade=new Grade();
  grades:Array<Grade>=new Array<Grade>();
  constructor(private gradeServices:GradeServices,public http:Http,public router:Router)
  { }

  ngOnInit() {
    this.chercher();
  }
  ajouter(){
    this.gradeServices.saveGrade(this.grade)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.gradeServices.getGrades(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.grades=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
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
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearch();
  }
  onEditGrade(id:number){
    this.router.navigate(['editGrade',id]);
  }
  onDeleteGrade(g:Grade){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.gradeServices.deleteGrade(g.id)
        .subscribe(data=> {
          this.pageGrade.content.splice(
            this.pageGrade.content.indexOf(g),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
}

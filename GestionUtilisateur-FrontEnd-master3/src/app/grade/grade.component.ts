import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Grade} from "../../model/model.grade";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {GradeServices} from "../../services/grade.services";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { CorpsServices } from '../../services/corps.services';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Corps } from '../../model/model.corps';
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
  size:number=100;
  grade:Grade=new Grade();
  grades:Array<Grade>=new Array<Grade>();
  corps:Corps=new Corps();
  corpss:Array<Corps>=new Array<Corps>();
  dataTable: any;
  constructor(private gradeServices:GradeServices,
    private corpsServices:CorpsServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router)
  { }

  ngOnInit() {
    this.doSearch();
    this.chercherCorps();
  }
  ajouter(){
    this.grade.corps=this.corps;
    this.gradeServices.saveGrade(this.grade)
      .subscribe(data=>{
        alert("Success d'ajout");
        this.doSearch();
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.gradeServices.getGrades(this.motCle,this.currentPage,this.size)
        .subscribe((data: any[]) => {
          this.pageGrade=data;
          this.chRef.detectChanges();
          // Now you can use jQuery DataTables :
          const table: any = $('table');
          this.dataTable = table.DataTable(); 
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
  chercherCorps()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corpss=data;
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

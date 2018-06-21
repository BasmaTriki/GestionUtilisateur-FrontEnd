import { Component, OnInit } from '@angular/core';
import {Grade} from "../../model/model.grade";
import {Router} from "@angular/router";
import {GradeServices} from "../../services/grade.services";
import {Http} from "@angular/http";
import {Specialite} from "../../model/model.specialite";
import {SpecialiteServices} from "../../services/specialite.services";

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.css']
})
export class SpecialiteComponent implements OnInit {
  pageSpecialite:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  specialite:Specialite=new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  constructor(private specialiteServices:SpecialiteServices,public http:Http,public router:Router) { }

  ngOnInit() {
  }
  ajouter(){
    this.specialiteServices.saveSpecialite(this.specialite)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.specialiteServices.getSpecialites(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageSpecialite=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearch();
  }
  onEditSpecialite(idSp:number){
    this.router.navigate(['editSpecialite',idSp]);
  }
  onDeleteSpecialite(s:Specialite){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.specialiteServices.deleteSpecialite(s.idSp)
        .subscribe(data=> {
          this.pageSpecialite.content.splice(
            this.pageSpecialite.content.indexOf(s),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
}
import { Component, OnInit } from '@angular/core';
import {Departement} from "../../model/model.departement";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {DepartementServices} from "../../services/departement.services";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {
  pageDepartement:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  departement:Departement=new Departement();
  departements:Array<Departement>=new Array<Departement>();
  constructor(private departementServices:DepartementServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.chercher();
  }
  ajouter(){
    this.departementServices.saveDepartement(this.departement)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.departementServices.getDepartements(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.departements=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.departementServices.allDepartements()
      .subscribe(data=>{
        this.departements=data;
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
  onEditDepartement(idDep:number){
    this.router.navigate(['editDepartement',idDep]);
  }
  onDeleteDepartement(d:Departement){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.departementServices.deleteDepartement(d.idDep)
        .subscribe(data=> {
          this.pageDepartement.content.splice(
            this.pageDepartement.content.indexOf(d),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Departement} from "../../model/model.departement";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {DepartementServices} from "../../services/departement.services";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '../../../node_modules/@angular/common/http';
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
  size:number=100;
  departement:Departement=new Departement();
  departements:Array<Departement>=new Array<Departement>();
  dataTable: any;
  constructor(private departementServices:DepartementServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
  }
  ajouter(){
    this.departementServices.saveDepartement(this.departement)
      .subscribe(data=>{
        alert("Success d'ajout departement");
        this.doSearch();
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.departementServices.getDepartements(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageDepartement=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
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
    this.router.navigate(['editdepartement',idDep]);
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

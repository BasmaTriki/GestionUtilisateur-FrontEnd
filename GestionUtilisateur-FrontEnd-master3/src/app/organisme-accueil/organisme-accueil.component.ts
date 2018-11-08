import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Organisme} from "../../model/model.organisme";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {OrganismeServices} from "../../services/organisme.services";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-organisme-accueil',
  templateUrl: './organisme-accueil.component.html',
  styleUrls: ['./organisme-accueil.component.css']
})
export class OrganismeAccueilComponent implements OnInit {
  pageorgAccueil:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=1000;
  orgAccueil:Organisme=new Organisme();
  dataTable: any;
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Z ]+"),Validators.minLength(5)]);
  libelleAr=new FormControl('',[Validators.required,Validators.minLength(5)]);
  constructor(private orgAccueilServices:OrganismeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
  }
  ajouter(){
    this.orgAccueilServices.saveOrganismeAccueil(this.orgAccueil)
      .subscribe(data=>{
        alert("Success d'ajout Organisme");
        this.doSearch();
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.orgAccueilServices.getOrganismeAccueils(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageorgAccueil=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
  }
  onEditOrgAccueil(idOrg:number){
    this.router.navigate(['editOrganisme',idOrg]);
  }
  onDeleteOrgAccueil(o:Organisme){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.orgAccueilServices.deleteOrganismeAccueil(o.idOrg)
        .subscribe(data=> {
          this.pageorgAccueil.content.splice(
            this.pageorgAccueil.content.indexOf(o),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères seulement' :
     this.libelleFr.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('required') ? 'Champs obligatoire' :
     this.libelleAr.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  valideFormulaire()
  {
    if((this.orgAccueil.libelleOrg!=""&& !(this.libelleFr.hasError('pattern'))&&!(this.libelleFr.hasError('minLength')))|| ((this.orgAccueil.libelleOrgAr!="") &&(this.orgAccueil.libelleOrgAr.length>=4)))
    {
      return false;
    }
    else
    return true;
  }
}

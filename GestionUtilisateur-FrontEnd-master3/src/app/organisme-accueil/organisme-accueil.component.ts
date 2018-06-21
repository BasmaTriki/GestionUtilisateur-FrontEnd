import { Component, OnInit } from '@angular/core';
import {OrganismeAccueil} from "../../model/model.organismeAccueil";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {OrganismeAccueilServices} from "../../services/organismeAccueil.services";


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
  size:number=5;
  orgAccueil:OrganismeAccueil=new OrganismeAccueil();
  constructor(private orgAccueilServices:OrganismeAccueilServices,public http:Http,public router:Router) { }

  ngOnInit() {
  }
  ajouter(){
    this.orgAccueilServices.saveOrganismeAccueil(this.orgAccueil)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.orgAccueilServices.getOrganismeAccueils(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageorgAccueil=data;
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
  onEditOrgAccueil(idOrg:number){
    this.router.navigate(['editOrgAccueil',idOrg]);
  }
  onDeleteOrgAccueil(o:OrganismeAccueil){
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
}

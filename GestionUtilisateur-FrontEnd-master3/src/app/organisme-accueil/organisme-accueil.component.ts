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
import { ToastrService } from 'ngx-toastr';

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
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(4)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  constructor(private orgAccueilServices:OrganismeServices,
    private chRef: ChangeDetectorRef, 
    private toastr: ToastrService,
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
    this.lang=sessionStorage.getItem("lang");
  }
  ajouter(){
    this.orgAccueilServices.saveOrganismeAccueil(this.orgAccueil)
      .subscribe(data=>{
        this.showSuccess();
        this.doSearch();
        this.orgAccueil=new Organisme();
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
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
    let confirm=window.confirm("Voulez-vous vraiment supprimer l'organisme?");
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
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.orgAccueil.libelleOrg.length < 4 ? 'Au minimum 4 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.orgAccueil.libelleOrgAr.length < 4 ? 'Au minimum 4 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.orgAccueil.libelleOrgAr!="") &&(this.orgAccueil.libelleOrgAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.orgAccueil.libelleOrg!=""&& (this.libelleFr.hasError('pattern'))&&(this.orgAccueil.libelleOrg.length<4))
      {
       return true;
      }  
      else if(this.orgAccueil.libelleOrg!="" && !(this.libelleFr.hasError('pattern'))&&(this.orgAccueil.libelleOrg.length<4))
      {
        return true;
      }
      else if(this.orgAccueil.libelleOrg!="" && (this.libelleFr.hasError('pattern'))&&(this.orgAccueil.libelleOrg.length>=4))
      {
        return true;
      }
      else if(this.orgAccueil.libelleOrg!="" && !(this.libelleFr.hasError('pattern'))&&(this.orgAccueil.libelleOrg.length>=4))
      {
        return false;
      }
    return false;
    }
    else
    return true;
  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("L'ajout de l'organisme a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تمت إضافة المؤسسة بنجاح");
    }
  }
}

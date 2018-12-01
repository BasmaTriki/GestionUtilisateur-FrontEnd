import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Departement} from "../../model/model.departement";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {DepartementServices} from "../../services/departement.services";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);
  constructor(private departementServices:DepartementServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    private toastr: ToastrService,
    public router:Router) { }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.doSearch();
  }
  ajouter(){
    this.departementServices.saveDepartement(this.departement)
      .subscribe(data=>{
        this.showSuccess();
        this.doSearch();
        this.departement=new Departement();
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
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
    let confirm=window.confirm("Voulez-vous vraiment supprimer le département?");
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
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.departement.nomDep.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.departement.nomDepAr.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.departement.nomDepAr!="") &&(this.departement.nomDepAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.departement.nomDep!=""&& (this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length<3))
      {
       return true;
      }  
      else if(this.departement.nomDep!="" && !(this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length<3))
      {
        return true;
      }
      else if(this.departement.nomDep!="" && (this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length>=3))
      {
        return true;
      }
      else if(this.departement.nomDep!="" && !(this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length>=3))
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
      this.toastr.success("L'ajout de département a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تمت إضافة القسم بنجاح");
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {Specialite} from "../../model/model.specialite";
import {SpecialiteServices} from "../../services/specialite.services";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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
  size:number=100;
  specialite:Specialite=new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  dataTable: any;
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string="";
  constructor(private specialiteServices:SpecialiteServices,
    private chRef: ChangeDetectorRef, 
    private toastr: ToastrService,
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
    this.lang=sessionStorage.getItem("lang");
  }
  ajouter(){
    this.specialiteServices.saveSpecialite(this.specialite)
      .subscribe(data=>{
        this.showSuccess();
        this.doSearch();
        this.router.navigate(['/specialite']);
        this.specialite=new Specialite();
        //window.location.reload();
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      });
  }
  doSearch(){
    this.specialiteServices.getSpecialites(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageSpecialite=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable(); 
      },err=>{
        console.log(err);
      })
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.specialite.libelleSp.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.specialite.libelleSpAr.length < 4 ? 'Au minimum 4 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.specialite.libelleSpAr!="") &&(this.specialite.libelleSpAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.specialite.libelleSp!=""&& (this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length<3))
      {
       return true;
      }  
      else if(this.specialite.libelleSp!="" && !(this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length<3))
      {
        return true;
      }
      else if(this.specialite.libelleSp!="" && (this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length>=3))
      {
        return true;
      }
      else if(this.specialite.libelleSp!="" && !(this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length>=3))
      {
        return false;
      }
    return false;
    }
    else
    return true;
  }
  onEditSpecialite(idSp:number){
    this.router.navigate(['editSpecialite',idSp]);
  }
  onDeleteSpecialite(s:Specialite){
    let confirm=window.confirm("Voulez-vous vraiment supprimer le spécialité?");
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
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("L'ajout de specialité a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تمت إضافة الإختصاص بنجاح");
    }
  }
}

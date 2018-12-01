import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";
import {Http} from '@angular/http';
import {PosteAdministrative} from '../../model/model.posteAdministrative';
import {PosteAdministrativeServices} from '../../services/posteAdministrative.services';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poste-administrative',
  templateUrl: './poste-administrative.component.html',
  styleUrls: ['./poste-administrative.component.css']
})
export class PosteAdministrativeComponent implements OnInit {
  pagePoste:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=1000;
  poste:PosteAdministrative=new PosteAdministrative();
  postes:Array<PosteAdministrative>=new Array<PosteAdministrative>();
  dataTable: any;
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string;
  constructor(private posteServices:PosteAdministrativeServices,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
    this.lang=sessionStorage.getItem("lang");
  }
  ajouter(){
    this.posteServices.savePoste(this.poste)
      .subscribe(data=>{
      this.showSuccess();
        this.doSearch();
        this.router.navigate(['/posteAdministratif']);
        this.poste= new PosteAdministrative();
      },err=>{
        console.log(err);
        this.toastr.error("veuillez vérifier les informations saisies..")
      });
  }
  doSearch(){
    this.posteServices.getPostes(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pagePoste=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
        this.toastr.error("Erreur")
      })
  }
  getErrorMessageFr(){
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.poste.libellePos.length < 3 ? ' Au minimum 3 caractères' :
    '';
  }
  getErrorMessageAr(){
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.poste.libellePosAr.length < 4 ? 'Au minimum 4 caractères' :
    '';
  }
  ValideFormulaire()
  {
    if((this.poste.libellePosAr!="") &&(this.poste.libellePosAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.poste.libellePos!=""&& (this.libelleFr.hasError('pattern'))&&(this.poste.libellePos.length<3))
      {
       return true;
      }  
      else if(this.poste.libellePos!="" && !(this.libelleFr.hasError('pattern'))&&(this.poste.libellePos.length<3))
      {
        return true;
      }
      else if(this.poste.libellePos!="" && (this.libelleFr.hasError('pattern'))&&(this.poste.libellePos.length>=3))
      {
        return true;
      }
      else if(this.poste.libellePos!="" && !(this.libelleFr.hasError('pattern'))&&(this.poste.libellePos.length>=3))
      {
        return false;
      }
    return false;
    }
    else
    return true;
  }
  onEditPoste(id:number){
    this.router.navigate(['editPosteAdmin',id]);
  }
  onDeletePoste(p:PosteAdministrative){
    let confirm=window.confirm("Voulez vous vraiment supprimer la poste?");
    if(confirm==true)
    {
      this.posteServices.deletePoste(p.id)
        .subscribe(data=> {
          this.pagePoste.content.splice(
            this.pagePoste.content.indexOf(p),1
          );
          console.log(data);
        },err=>{console.log(err);
          this.toastr.error("veuillez vérifier les informations saisies..")
        })
    }
  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("L'ajout du poste administratif a été effectué avec succès.");
    }
  else
    {
      this.toastr.success(" تمت إضافة الخطة الوظيفية بنجاح");
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Service} from "../../model/model.service";
import {FormControl, Validators} from "@angular/forms";
import {ServiceServices} from "../../services/service.services";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  pageServices:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=1000;
  service:Service=new Service();
  dataTable: any;
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string="";
  constructor(private serviceServices:ServiceServices,
    private chRef: ChangeDetectorRef, 
    private toastr: ToastrService,
    private http: HttpClient,
    public router:Router)
  { }
  ngOnInit() {
this.doSearch();
this.lang=sessionStorage.getItem("lang");
  }
  ajouter(){
    this.serviceServices.saveService(this.service)
      .subscribe(data=>{
        this.showSuccess();
        this.doSearch();
        this.router.navigate(['/service']);
        this.service=new Service();
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies..");
      });
  }
  doSearch(){
    this.serviceServices.getServices(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageServices=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
  }
  getErrorMessageFr(){
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
           this.service.libelleServ.length < 3 ? ' Au minimum 3 caractères' :
    '';
  }
  getErrorMessageAr(){
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.service.libelleServAr.length < 4 ? 'Au minimum 4 caractères' :
    '';
  }
  ValideFormulaire()
  {
    if((this.service.libelleServAr!="") &&(this.service.libelleServAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.service.libelleServ!=""&& (this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length<3))
      {
       return true;
      }  
      else if(this.service.libelleServ!="" && !(this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length<3))
      {
        return true;
      }
      else if(this.service.libelleServ!="" && (this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length>=3))
      {
        return true;
      }
      else if(this.service.libelleServ!="" && !(this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length>=3))
      {
        return false;
      }
    return false;
    }
    else
    return true;
  }
  onEditService(idServ:number){
    this.router.navigate(['editService',idServ]);
  }
  onDeleteService(s:Service){
    let confirm=window.confirm("Voulez-vous vraiment supprimer le service ?");
    if(confirm==true)
    {
      this.serviceServices.deleteService(s.idServ)
        .subscribe(data=> {
          this.pageServices.content.splice(
            this.pageServices.content.indexOf(s),1
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
      this.toastr.success("L'ajout de service a été effectué avec succès.");
    }
  else
    {
      this.toastr.success("تمت إضافة الصنف بنجاح");
    }
  }
}

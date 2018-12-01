import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Corps} from "../../model/model.corps";
import {Router} from "@angular/router";
import {CorpsServices} from "../../services/corps.services";
import {Http} from "@angular/http";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-corps',
  templateUrl: './corps.component.html',
  styleUrls: ['./corps.component.css']
})
export class CorpsComponent implements OnInit {
  pageCorps:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=100;
  corps:Corps=new Corps();
  corpss:Array<Corps>=new Array<Corps>();
  dataTable: any;
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);
  constructor(private corpsServices:CorpsServices,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
    this.lang=sessionStorage.getItem("lang");
  }
  ajouter(){
    this.corpsServices.saveCorps(this.corps)
      .subscribe(data=>{
       this.showSuccess();
        this.doSearch();
        this.corps=new Corps();
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      });
  }
  doSearch(){
    this.corpsServices.getCorpss(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
        this.pageCorps=data;
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
  onEditCorps(idcps:number){
    this.router.navigate(['editCorps',idcps]);
  }
  onDeleteCorps(c:Corps){
    let confirm=window.confirm("Voulez-vous vraiment supprimer le corps?");
    if(confirm==true)
    {
      this.corpsServices.deleteCorps(c.idcps)
        .subscribe(data=> {
          this.pageCorps.content.splice(
            this.pageCorps.content.indexOf(c),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.corps.libelleCps.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.corps.libelleCpsAr.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  valideFormulaire()
  {
    if((this.corps.libelleCpsAr!="") &&(this.corps.libelleCpsAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.corps.libelleCps!=""&& (this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length<3))
      {
       return true;
      }  
      else if(this.corps.libelleCps!="" && !(this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length<3))
      {
        return true;
      }
      else if(this.corps.libelleCps!="" && (this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length>=3))
      {
        return true;
      }
      else if(this.corps.libelleCps!="" && !(this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length>=3))
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
      this.toastr.success("L'ajout de corps a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تمت إضافة السلك بنجاح");
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Grade} from "../../model/model.grade";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {GradeServices} from "../../services/grade.services";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { CorpsServices } from '../../services/corps.services';
import { HttpClient } from '@angular/common/http';
import { Corps } from '../../model/model.corps';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  pageGrade:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=100;
  grade:Grade=new Grade();
  grades:Array<Grade>=new Array<Grade>();
  corps:Corps=new Corps();
  corpss:Array<Corps>=new Array<Corps>();
  dataTable: any;
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèù' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);
  constructor(private gradeServices:GradeServices,
    private corpsServices:CorpsServices,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService, 
    private http: HttpClient,
    public router:Router)
  { }

  ngOnInit() {
    this.doSearch();
    this.chercherCorps();
    this.lang=sessionStorage.getItem("lang");
  }
  ajouter(){
    this.grade.corps=this.corps;
    this.gradeServices.saveGrade(this.grade)
      .subscribe(data=>{
       this.showSuccess();
        this.doSearch();
        this.grade=new Grade();
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      });
  }
  doSearch(){
    this.gradeServices.getGrades(this.motCle,this.currentPage,this.size)
        .subscribe((data: any[]) => {
          this.pageGrade=data;
          this.chRef.detectChanges();
          // Now you can use jQuery DataTables :
          const table: any = $('table');
          this.dataTable = table.DataTable(); 
      },err=>{
        console.log(err);
      })
  }
  chercherCorps()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corpss=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  onEditGrade(id:number){
    this.router.navigate(['editGrade',id]);
  }
  onDeleteGrade(g:Grade){
    let confirm=window.confirm("Voulez-vous vraiment supprimer le grade?");
    if(confirm==true)
    {
      this.gradeServices.deleteGrade(g.id)
        .subscribe(data=> {
          this.pageGrade.content.splice(
            this.pageGrade.content.indexOf(g),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.grade.titre.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.grade.titreAr.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  valideFormulaire()
  {
    if((this.grade.titreAr!="") &&(this.grade.titreAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.grade.titre!=""&& (this.libelleFr.hasError('pattern'))&&(this.grade.titre.length<3))
      {
       return true;
      }  
      else if(this.grade.titre!="" && !(this.libelleFr.hasError('pattern'))&&(this.grade.titre.length<3))
      {
        return true;
      }
      else if(this.grade.titre!="" && (this.libelleFr.hasError('pattern'))&&(this.grade.titre.length>=3))
      {
        return true;
      }
      else if(this.grade.titre!="" && !(this.libelleFr.hasError('pattern'))&&(this.grade.titre.length>=3))
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
      this.toastr.success("L'ajout de grade a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تمت إضافة الرتبة بنجاح");
    }
  }
}

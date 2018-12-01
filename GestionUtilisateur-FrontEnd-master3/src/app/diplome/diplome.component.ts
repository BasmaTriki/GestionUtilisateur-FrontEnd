import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {DiplomeServices} from '../../services/diplome.services';
import {Diplome} from '../../model/model.diplome';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-diplome',
  templateUrl: './diplome.component.html',
  styleUrls: ['./diplome.component.css']
})
export class DiplomeComponent implements OnInit {
  pageDiplome:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=100;
  diplome:Diplome=new Diplome();
  diplomes:Array<Diplome>=new Array<Diplome>();
  dataTable: any;
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);
  constructor(private diplomeServices:DiplomeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    private toastr: ToastrService,
    public router:Router) { }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.doSearch();
  }
ajouter(){
  this.diplomeServices.saveDiplome(this.diplome)
    .subscribe(data=>{
     this.showSuccess();
      this.doSearch();
      this.diplome=new Diplome();
    },err=>{
      console.log(err);
      this.toastr.error("Veuillez vérifier les informations saisies");
    });
   
}
  doSearch(){
    this.diplomeServices.getDiplomes(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageDiplome=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable(); 
      console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.diplomeServices.allDiplomes()
      .subscribe(data=>{
        this.diplomes=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearch();
  }
  onEditDiplome(idDip:number){
    this.router.navigate(['editDiplome',idDip]);
  }
  onDeleteDiplome(d:Diplome){
    let confirm=window.confirm("Voulez-vous vraiment supprimer le diplôme?");
    if(confirm==true)
    {
      this.diplomeServices.deleteDiplome(d.idDip)
        .subscribe(data=> {
          this.pageDiplome.content.splice(
            this.pageDiplome.content.indexOf(d),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.diplome.titreDip.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.diplome.titreDipAr.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  valideFormulaire()
  {
    if((this.diplome.titreDipAr!="") &&(this.diplome.titreDipAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.diplome.titreDip!=""&& (this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length<3))
      {
       return true;
      }  
      else if(this.diplome.titreDip!="" && !(this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length<3))
      {
        return true;
      }
      else if(this.diplome.titreDip!="" && (this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length>=3))
      {
        return true;
      }
      else if(this.diplome.titreDip!="" && !(this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length>=3))
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
      this.toastr.success("L'ajout de diplôme a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تمت إضافة الشهادة بنجاح");
    }
  }
}

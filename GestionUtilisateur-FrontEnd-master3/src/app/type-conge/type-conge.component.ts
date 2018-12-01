import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {TypeConge} from '../../model/model.typeConge';
import {FormControl, Validators} from "@angular/forms";
import {TypeCongeServices} from '../../services/typeConge.services';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-type-conge',
  templateUrl: './type-conge.component.html',
  styleUrls: ['./type-conge.component.css']
})
export class TypeCongeComponent implements OnInit {
  pageTypeConge:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=100;
  typeConge:TypeConge=new TypeConge();
  typeConges:Array<TypeConge>=new Array<TypeConge>();
  dataTable: any;
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string="";
  TypeCongePers = [
    {value: 'Femme'},
    {value: 'Homme'},
    {value: 'Tous'}
  ];
  TypeCongePersAr = [
    {value: 'انثى'},
    {value: 'ذكر'},
    {value: 'الكل'}
  ];
  type:string="Femme";
  constructor(private typeCongeServices:TypeCongeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    private toastr: ToastrService,
    public router:Router) { 
      this.lang=sessionStorage.getItem("lang");
    }

  ngOnInit() {
    this.doSearch();
    this.lang=sessionStorage.getItem("lang");
  }
  ajouter(){
    if(this.type=="Femme" || this.type=="انثى")
    {
      this.typeConge.typePers="Femme";
    }
    if(this.type=="Homme" || this.type=="ذكر")
    {
      this.typeConge.typePers="Homme";
    }
    if(this.type=="Tous" || this.type=="الكل")
    {
      this.typeConge.typePers="Tous";
    }
    this.typeCongeServices.saveTypeConge(this.typeConge)
      .subscribe(data=>{
        this.showSuccess();
        this.doSearch();
        this.router.navigate(['/typeConge']);
        this.typeConge= new TypeConge();
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.typeCongeServices.getTypeConges(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageTypeConge=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
  }
  onEditTypeConge(idCg:number){
    this.router.navigate(['editTypeConge',idCg]);
  }
  getErrorMessageFr(){
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this .typeConge.libelleType.length < 3 ? ' Au minimum 3 caractères' :
    '';
  }
  getErrorMessageAr(){
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.typeConge.libelleTypeAr.length < 4 ? 'Au minimum 4 caractères' :
    '';
  }
  ValideFormulaire()
  {
    if((this.typeConge.libelleTypeAr!="") &&(this.typeConge.libelleTypeAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.typeConge.libelleType!=""&& (this.libelleFr.hasError('pattern'))&&(this.typeConge.libelleType.length<3))
      {
       return true;
      }  
      else if(this.typeConge.libelleType!="" && !(this.libelleFr.hasError('pattern'))&&(this.typeConge.libelleType.length<3))
      {
        return true;
      }
      else if(this.typeConge.libelleType!="" && (this.libelleFr.hasError('pattern'))&&(this.typeConge.libelleType.length>=3))
      {
        return true;
      }
      else if(this.typeConge.libelleType!="" && !(this.libelleFr.hasError('pattern'))&&(this.typeConge.libelleType.length>=3))
      {
        return false;
      }
    return false;
    }
    else
    return true;
  }
  onDeleteTypeConge(tc:TypeConge){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.typeCongeServices.deleteTypeConge(tc.idCg)
        .subscribe(data=> {
          this.pageTypeConge.content.splice(
            this.pageTypeConge.content.indexOf(tc),1
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
      this.toastr.success("L'ajout du type de congé a été effectué avec succès.");
    }
  else
    {
      this.toastr.success("تمت إضافة نوع العطلة بنجاح");
    }
  }
  autoriser(autorisation:boolean)
  {if(this.lang=='fr')
  {
    if(autorisation)
    return "Oui"
  else
    return "Non"
  }
  else if(this.lang=='ar')
  {
    if(autorisation)
    return "نعم"
  else
    return "لا"
  }
  }
  actif(actif:boolean)
  {if(this.lang=='fr')
    {
      if(actif)
      return "Oui"
    else
      return "Non"
    }
    else if(this.lang=='ar')
    {
      if(actif)
      return "نعم"
    else
      return "لا"
    }
  }
}

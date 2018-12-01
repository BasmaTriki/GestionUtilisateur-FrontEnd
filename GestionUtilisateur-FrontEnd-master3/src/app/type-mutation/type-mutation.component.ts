import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Http} from '@angular/http';
import {FormControl, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {TypeMutation} from '../../model/model.typeMutation';
import {TypeMutationsServices} from '../../services/typeMutation.services';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-mutation',
  templateUrl: './type-mutation.component.html',
  styleUrls: ['./type-mutation.component.css']
})
export class TypeMutationComponent implements OnInit {
  pageTypeMutation:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=100;
  typeMutation:TypeMutation=new TypeMutation();
  typeMutations:Array<TypeMutation>=new Array<TypeMutation>();
  dataTable: any;
  designationFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  designationAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string;
  constructor(private typeMutationServices:TypeMutationsServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    private toastr: ToastrService,
    public router:Router) {}

  ngOnInit() {
    this.doSearch();
    this.lang=sessionStorage.getItem("lang");
}
ajouter(){
  this.typeMutationServices.saveTypeMutation(this.typeMutation)
    .subscribe(data=>{
    this.showSuccess();
      this.doSearch();
      this.router.navigate(['/typeMutation']);
      this.typeMutation= new TypeMutation();
    },err=>{
      console.log(err);
      this.toastr.error("veuillez vérifier les informations saisies");
    });
}
doSearch(){
  this.typeMutationServices.getTypeMutations(this.motCle,this.currentPage,this.size)
  .subscribe((data: any[]) => {
    this.pageTypeMutation=data;
    this.chRef.detectChanges();
    // Now you can use jQuery DataTables :
    const table: any = $('table');
    this.dataTable = table.DataTable();
     
    },err=>{
      console.log(err);
      this.toastr.error("Erreur");
    })
}
getErrorMessageFr(){
  return this.designationFr.hasError('pattern') ? 'des caractères en français seulement' :
         this.typeMutation.designationMutation.length < 3 ? ' Au minimum 3 caractères' :
  '';
}
getErrorMessageAr(){
  return this.designationAr.hasError('pattern') ? 'des caractères en arabe seulement' :
  this.designationAr.hasError('required') ? 'Champ obligatoire' :
  this.typeMutation.designationMutationAr.length < 4 ? 'Au minimum 4 caractères' :
  '';
}
ValideFormulaire()
{
  if((this.typeMutation.designationMutationAr!="") &&(this.typeMutation.designationMutationAr.length>=4) && !(this.designationAr.hasError('pattern')))
  {
    if(this.typeMutation.designationMutation!=""&& (this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length<3))
    {
     return true;
    }  
    else if(this.typeMutation.designationMutation!="" && !(this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length<3))
    {
      return true;
    }
    else if(this.typeMutation.designationMutation!="" && (this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length>=3))
    {
      return true;
    }
    else if(this.typeMutation.designationMutation!="" && !(this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length>=3))
    {
      return false;
    }
  return false;
  }
  else
  return true;
}
onEditTypeMutation(code:number){
  this.router.navigate(['editTypeMutation',code]);
}
onDeleteTypeMutation(tm:TypeMutation){
  let confirm=window.confirm("Voulez vous vraiment supprimer le type?");
  if(confirm==true)
  {
    this.typeMutationServices.deleteTypeMutation(tm.code)
      .subscribe(data=> {
        this.pageTypeMutation.content.splice(
          this.pageTypeMutation.content.indexOf(tm),1
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
    this.toastr.success("L'ajout du type de mutation a été effectué avec succès..");
  }
else
  {
    this.toastr.success("تمت إضافة نوع النقلة بنجاح");
  }
}
}

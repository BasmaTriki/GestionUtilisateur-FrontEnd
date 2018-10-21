import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Http} from '@angular/http';
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
      console.log(data);
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
    this.toastr.success("Succes d'ajouter type de mutation");
  }
else
  {
    this.toastr.success("تمت إضافة نوع النقلة بنجاح");
  }
}
}

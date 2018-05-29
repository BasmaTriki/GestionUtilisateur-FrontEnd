import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {TypeMutation} from '../../model/model.typeMutation';
import {TypeMutationsServices} from '../../services/typeMutation.services';
import {TypeConge} from '../../model/model.typeConge';


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
  size:number=5;
  typeMutation:TypeMutation=new TypeMutation();
  typeMutations:Array<TypeMutation>=new Array<TypeMutation>();
  constructor(private typeMutationServices:TypeMutationsServices,public http:Http,public router:Router) {}

  ngOnInit() {
  this.chercher();
}
ajouter(){
  this.typeMutationServices.saveTypeMutation(this.typeMutation)
    .subscribe(data=>{
      alert("Succès d'ajout");
      console.log(data);
    },err=>{
      console.log(err);
    });
}
doSearch(){
  this.typeMutationServices.getTypeMutations(this.motCle,this.currentPage,this.size)
    .subscribe(data=>{
      console.log(data);
      this.pageTypeMutation=data;
      this.pages=new Array(data.totalPages);
    },err=>{
      console.log(err);
    })
}
chercher()
{
  this.typeMutationServices.allTypesMutations()
    .subscribe(data=>{
      this.typeMutations=data;
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
onEditTypeMutation(code:number){
  this.router.navigate(['editTypeMutation',code]);
}
onDeleteTypeMutation(tm:TypeMutation){
  let confirm=window.confirm("Etes-vous sûre?");
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
}

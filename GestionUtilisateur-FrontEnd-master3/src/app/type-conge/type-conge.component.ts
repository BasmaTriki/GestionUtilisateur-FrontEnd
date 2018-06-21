import { Component, OnInit } from '@angular/core';
import {TypeConge} from '../../model/model.typeConge';
import {TypeCongeServices} from '../../services/typeConge.services';
import {Router} from '@angular/router';
import {Http} from '@angular/http';


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
  size:number=5;
  typeConge:TypeConge=new TypeConge();
  typeConges:Array<TypeConge>=new Array<TypeConge>();
  constructor(private typeCongeServices:TypeCongeServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.chercher();
  }
  ajouter(){
    this.typeCongeServices.saveTypeConge(this.typeConge)
      .subscribe(data=>{
        alert("Succès d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.typeCongeServices.getTypeConges(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageTypeConge=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.typeCongeServices.allTypesConges()
      .subscribe(data=>{
        this.typeConges=data;
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
  onEditTypeConge(idCg:number){
    this.router.navigate(['editTypeConge',idCg]);
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
  autoriser(autorisation:boolean)
  {
    if(autorisation)
      return "Oui"
    else
      return "Non"
  }

}

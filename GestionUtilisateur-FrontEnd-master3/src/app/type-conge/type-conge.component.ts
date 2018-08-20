import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {TypeConge} from '../../model/model.typeConge';
import {TypeCongeServices} from '../../services/typeConge.services';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '../../../node_modules/@angular/common/http';

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
  constructor(private typeCongeServices:TypeCongeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
  }
  ajouter(){
    this.typeCongeServices.saveTypeConge(this.typeConge)
      .subscribe(data=>{
        alert("Succès d'ajout type de congé");
        this.doSearch();
        console.log(data);
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

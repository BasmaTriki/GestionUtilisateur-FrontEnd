import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {PosteAdministrative} from '../../model/model.posteAdministrative';
import {PosteAdministrativeServices} from '../../services/posteAdministrative.services';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-poste-administrative',
  templateUrl: './poste-administrative.component.html',
  styleUrls: ['./poste-administrative.component.css']
})
export class PosteAdministrativeComponent implements OnInit {
  pagePoste:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=1000;
  poste:PosteAdministrative=new PosteAdministrative();
  postes:Array<PosteAdministrative>=new Array<PosteAdministrative>();
  dataTable: any;
  constructor(private posteServices:PosteAdministrativeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
  }
  ajouter(){
    this.posteServices.savePoste(this.poste)
      .subscribe(data=>{
        alert("Success d'ajout poste Administratif");
        this.doSearch();
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.posteServices.getPostes(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pagePoste=data;
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
  onEditPoste(id:number){
    this.router.navigate(['editPosteAdmin',id]);
  }
  onDeletePoste(p:PosteAdministrative){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.posteServices.deletePoste(p.id)
        .subscribe(data=> {
          this.pagePoste.content.splice(
            this.pagePoste.content.indexOf(p),1
          );
          console.log(data);
        },err=>{console.log(err);
        })
    }
  }


}

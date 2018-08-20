import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {DiplomeServices} from '../../services/diplome.services';
import {Diplome} from '../../model/model.diplome';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '../../../node_modules/@angular/common/http';
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
  constructor(private diplomeServices:DiplomeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
  }
ajouter(){
  this.diplomeServices.saveDiplome(this.diplome)
    .subscribe(data=>{
      alert("Success d'ajout diplôme");
      this.doSearch();
      console.log(data);
    },err=>{
      console.log(err);
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
    let confirm=window.confirm("Etes-vous sûre?");
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
}

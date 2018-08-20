import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Corps} from "../../model/model.corps";
import {Router} from "@angular/router";
import {CorpsServices} from "../../services/corps.services";
import {Http} from "@angular/http";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '../../../node_modules/@angular/common/http';
@Component({
  selector: 'app-corps',
  templateUrl: './corps.component.html',
  styleUrls: ['./corps.component.css']
})
export class CorpsComponent implements OnInit {
  pageCorps:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=100;
  corps:Corps=new Corps();
  corpss:Array<Corps>=new Array<Corps>();
  dataTable: any;
  constructor(private corpsServices:CorpsServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearch();
  }
  ajouter(){
    this.corpsServices.saveCorps(this.corps)
      .subscribe(data=>{
        alert("Success d'ajouter corps");
        this.doSearch();
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.corpsServices.getCorpss(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
        this.pageCorps=data;
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
  onEditCorps(idcps:number){
    this.router.navigate(['editCorps',idcps]);
  }
  onDeleteCorps(c:Corps){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.corpsServices.deleteCorps(c.idcps)
        .subscribe(data=> {
          this.pageCorps.content.splice(
            this.pageCorps.content.indexOf(c),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
}

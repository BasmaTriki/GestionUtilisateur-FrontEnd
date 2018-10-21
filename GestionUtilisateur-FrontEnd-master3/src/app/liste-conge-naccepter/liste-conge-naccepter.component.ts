import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { CongeServices } from '../../services/conge.services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-liste-conge-naccepter',
  templateUrl: './liste-conge-naccepter.component.html',
  styleUrls: ['./liste-conge-naccepter.component.css']
})
export class ListeCongeNaccepterComponent implements OnInit {
  dataTable: any;
  pageConge:any;
  motCle:string="";
  currentPage:number=0;
  size:number=1000;
  lang:string;
  constructor(private congeServices:CongeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient, public router: Router) 
    {
      this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
  this.doSearch();
  }
  doSearch()
  {
    this.congeServices.getConges("refuse",this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageConge = data;
      console.log(data);
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();   
  },err=>{
    console.log(err);
  })
  }
}

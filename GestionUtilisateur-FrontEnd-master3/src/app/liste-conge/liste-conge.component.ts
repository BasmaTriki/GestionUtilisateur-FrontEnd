import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { CongeServices } from '../../services/conge.services';
import { Subject } from 'rxjs';
import { Conge } from '../../model/model.conge';

@Component({
  selector: 'app-liste-conge',
  templateUrl: './liste-conge.component.html',
  styleUrls: ['./liste-conge.component.css']
})
export class ListeCongeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
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
    this.congeServices.getConges("validé",this.currentPage,this.size)
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
  download(idCong:number)
  {
    this.http.get("http://localhost:8080/downloadCertificat/"+idCong)
   .subscribe(res=>{
     console.log(res);
   })
  }
  Certaficat(c:Conge)
{
  if(c.certaficat==null||c.certaficat=="")
  {
    return true;
  }
else
  {
    return false;
  }
}
}

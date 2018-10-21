import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MutationServices } from '../../services/Mutation.services';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-liste-mutation',
  templateUrl: './liste-mutation.component.html',
  styleUrls: ['./liste-mutation.component.css']
})
export class ListeMutationComponent implements OnInit {
pageMutation:any;
dataTable: any;
motCle:string="";
currentPage:number=0;
pages:Array<number>;
size:number=1000;
lang:string;
  constructor(private mutationServices:MutationServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) 
    {
      this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
    this.doSearch();
   
  }
  doSearch()
  {
    this.mutationServices.getMutations(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageMutation = data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
  }
}

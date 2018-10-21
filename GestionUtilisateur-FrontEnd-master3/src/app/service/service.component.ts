import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Service} from "../../model/model.service";
import {ServiceServices} from "../../services/service.services";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  pageServices:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=1000;
  service:Service=new Service();
  dataTable: any;
  constructor(private serviceServices:ServiceServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router)
  { }
  ngOnInit() {
this.doSearch();
  }
  ajouter(){
    this.serviceServices.saveService(this.service)
      .subscribe(data=>{
        alert("Success d'ajout Service");
        console.log(data);
        this.doSearch();
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.serviceServices.getServices(this.motCle,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageServices=data;
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
  onEditService(idServ:number){
    this.router.navigate(['editService',idServ]);
  }
  onDeleteService(s:Service){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.serviceServices.deleteService(s.idServ)
        .subscribe(data=> {
          this.pageServices.content.splice(
            this.pageServices.content.indexOf(s),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
}

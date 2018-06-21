import { Component, OnInit } from '@angular/core';
import {Service} from "../../model/model.service";
import {ServiceServices} from "../../services/service.services";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

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
  size:number=5;
  service:Service=new Service();
  constructor(private serviceServices:ServiceServices,public http:Http,public router:Router)
  { }
  ngOnInit() {
  }
  ajouter(){
    this.serviceServices.saveService(this.service)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.serviceServices.getServices(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageServices=data;
        this.pages=new Array(data.totalPages);
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

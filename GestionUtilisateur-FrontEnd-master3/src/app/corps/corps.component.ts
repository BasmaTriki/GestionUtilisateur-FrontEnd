import { Component, OnInit } from '@angular/core';
import {Corps} from "../../model/model.corps";
import {Router} from "@angular/router";
import {CorpsServices} from "../../services/corps.services";
import {Http} from "@angular/http";

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
  size:number=5;
  corps:Corps=new Corps();
  corpss:Array<Corps>=new Array<Corps>();
  constructor(private corpsServices:CorpsServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.chercher();
  }
  ajouter(){
    this.corpsServices.saveCorps(this.corps)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.corpsServices.getCorpss(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.corpss=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corpss=data;
        this.pageCorps=data;
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

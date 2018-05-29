import { Component, OnInit } from '@angular/core';
import {Conge} from "../../model/model.conge";
import {TypeCongeServices} from "../../services/typeConge.services";
import {Http} from "@angular/http";
import {CongeServices} from "../../services/conge.services";
import {Router} from "@angular/router";
import {UsersServices} from "../../services/users.services";
import {PersonnelServices} from "../../services/personnel.services";
import {Personnel} from "../../model/model.personnel";

@Component({
  selector: 'app-historique-conge',
  templateUrl: './historique-conge.component.html',
  styleUrls: ['./historique-conge.component.css']
})
export class HistoriqueCongeComponent implements OnInit {
  conges:Array<Conge>=new Array<Conge>();
  pageConge:any;
  motCle:string="accepte";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  conge:Conge= new Conge();
  personnel:Personnel=new Personnel();
  personnels:Array<Personnel>=new Array<Personnel>();
  constructor(private congeServices:CongeServices,public personnelService:PersonnelServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.AfficherPersonnel();
  }
  chercher()
  {
    this.congeServices.allConges()
      .subscribe(data=>{
        this.conges=data;
        console.log(data);
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  doSearch(){
    this.congeServices.getCongesPersonnel(this.personnel.matricule,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageConge=data;
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
  AfficherPersonnel()
  {
    this.personnelService.getAllPersonnel()
      .subscribe(data=>{
        this.personnels=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
}

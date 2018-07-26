import { Component, OnInit } from '@angular/core';
import {Conge} from "../../model/model.conge";
import {Http} from "@angular/http";
import {CongeServices} from "../../services/conge.services";
import {Router, ActivatedRoute} from "@angular/router";
import {PersonnelServices} from "../../services/personnel.services";
import {Personnel} from "../../model/model.personnel";
import { RepriseCongeComponent } from '../reprise-conge/reprise-conge.component';
import { MatDialog } from '@angular/material';

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
  matricule:number;
  constructor(private congeServices:CongeServices,
    public activatedRoute:ActivatedRoute,
    public personnelService:PersonnelServices,
    public http:Http,
    public dialog: MatDialog,
    public router:Router) 
    {
      this.matricule=activatedRoute.snapshot.params['matricule'];
     }

  ngOnInit() {
    this.personnelService.getPersonnel(this.matricule)
    .subscribe(data=>{
      this.personnel=data;
      console.log(data);
    },err=>{
      console.log(err);
    });
    this.doSearch();
  }
  doSearch(){
    this.congeServices.getCongesPersonnel(this.matricule,this.currentPage,this.size)
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
  RepriseConge(c:Conge)
  {
    let dialogRef = this.dialog.open(RepriseCongeComponent, {data:{name:c.idCong}});
    this.doSearch();
  }
}

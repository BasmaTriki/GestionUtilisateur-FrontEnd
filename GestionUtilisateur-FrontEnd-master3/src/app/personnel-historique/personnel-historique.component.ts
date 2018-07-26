import { Component, OnInit } from '@angular/core';
import { CongeServices } from '../../services/conge.services';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelServices } from '../../services/personnel.services';
import { Conge } from '../../model/model.conge';
import { Personnel } from '../../model/model.personnel';

@Component({
  selector: 'app-personnel-historique',
  templateUrl: './personnel-historique.component.html',
  styleUrls: ['./personnel-historique.component.css']
})
export class PersonnelHistoriqueComponent implements OnInit {
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
    public router:Router) 
    {
      this.matricule=Number(sessionStorage.getItem('idUser'));
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
}

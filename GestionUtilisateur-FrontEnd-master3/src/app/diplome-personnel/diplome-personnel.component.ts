import { Component, OnInit,ViewChild } from '@angular/core';
import {Diplome} from "../../model/model.diplome";
import {DiplomeServices} from "../../services/diplome.services";
import {Personnel} from "../../model/model.personnel";
import {PersonnelServices} from "../../services/personnel.services";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {DiplomePersonnelServices} from "../../services/diplomepersonnel.services";
import {DiplomePersonnel} from "../../model/model.diplomepersonnel";
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-diplome-personnel',
  templateUrl: './diplome-personnel.component.html',
  styleUrls: ['./diplome-personnel.component.css']
})
export class DiplomePersonnelComponent implements OnInit {
  diplomes: Array<Diplome> = new Array<Diplome>();
  pageDiplomep:any;
  motCle:string="";
  currentPage:number=0;
  size:number=5;
  pages: Array<number>;
  personnel:Personnel=new Personnel();
  personnels:Array<Personnel>=new Array<Personnel>();
  diplome:Diplome=new Diplome();
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  diplomeps:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  displayedColumns = ['id_DipP', 'personnel', 'diplome', 'date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource=new MatTableDataSource<DiplomePersonnel>(this.diplomeps);
  constructor( private diplomeServices: DiplomeServices,private diplomepService:DiplomePersonnelServices,public http:Http, private personnelServices:PersonnelServices, public router:Router)
  { }

  ngOnInit() {
    this.chercherDip();
  this.AfficherPersonnel();
    this.dataSource.paginator = this.paginator;
    this.chercherDipPers();
  }
  chercherDip() {
    this.diplomeServices.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
        this.pages = new Array(data.totalPages);
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  Enregistrer()
  {this.diplomep.personnel=this.personnel;
   this.diplomep.diplome=this.diplome;
   this.diplomepService.saveDiplomePersonnel(this.diplomep)
  .subscribe(data => {
    alert("Success d'ajout");
    window.location.reload();
   // this.router.navigate(['users']);
    console.log(data);
  }, err => {
    console.log(err);
  })
  }
  annuler()
  {}
  AfficherPersonnel()
  {
    this.personnelServices.getAllPersonnel()
      .subscribe(data=>{
        this.personnels=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  chercherDipPers() {
    this.diplomepService.getAllDiplomePersonnels()
      .subscribe(data => {
        this.diplomeps = data;
        this.dataSource = data;
       this.pages = new Array(data.totalPages);
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  onEditDiplomeP(idDipP:number){
    this.router.navigate(['editDiplome',idDipP]);
  }
  onDeleteDiplomeP(d:DiplomePersonnel){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.diplomeServices.deleteDiplome(d.id_DipP)
        .subscribe(data=> {
          this.pageDiplomep.content.splice(
            this.pageDiplomep.content.indexOf(d),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
}

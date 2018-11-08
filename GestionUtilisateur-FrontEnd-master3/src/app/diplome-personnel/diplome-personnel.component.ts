import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {Diplome} from "../../model/model.diplome";
import {DiplomeServices} from "../../services/diplome.services";
import {Personnel} from "../../model/model.personnel";
import {PersonnelServices} from "../../services/personnel.services";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {DiplomePersonnelServices} from "../../services/diplomepersonnel.services";
import {DiplomePersonnel} from "../../model/model.diplomepersonnel";
import {MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Organisme } from '../../model/model.organisme';
import { OrganismeServices } from '../../services/organisme.services';
@Component({
  selector: 'app-diplome-personnel',
  templateUrl: './diplome-personnel.component.html',
  styleUrls: ['./diplome-personnel.component.css']
})
export class DiplomePersonnelComponent implements OnInit {
  diplomes: Array<Diplome> = new Array<Diplome>();
  motCle:string="";
  idDep:number;
  currentPage:number=0;
  size:number=5;
  pages: Array<number>;
  personnel:Personnel=new Personnel();
  personnels:Array<Personnel>=new Array<Personnel>();
  diplome:Diplome=new Diplome();
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  lang:string;
  organisme:Organisme=new Organisme();
  orgOrigines:Array<Organisme>=new Array<Organisme>();
  constructor( private diplomeServices: DiplomeServices,
    private diplomepService:DiplomePersonnelServices,
    private organismeServices:OrganismeServices,
    public http:Http,
    public dialogRef: MatDialogRef<DiplomePersonnelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router:Router)
  {
    this.lang=sessionStorage.getItem("lang");
   }

  ngOnInit() {
    this.idDep=this.data.num;
    this.chercherDip();
    this.diplomepService.getDiplomePersonnel(this.idDep)
    .subscribe(data => {
      this.diplomep = data;
    }, err => {
      console.log(err);
    })
    this.chercherOrg();
    
  }
  chercherDip() {
    this.diplomeServices.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
      }, err => {
        console.log(err);
      })
  }
  Enregistrer()
  { this.diplomep.diplome=this.diplome;
    this.diplomep.organisme=this.organisme;
   this.diplomepService.updateDiplomePersonnel(this.diplomep)
  .subscribe(data => {
    this.Close();
  }, err => {
    console.log(err);
  })
  }
  Close()
  {
    this.dialogRef.close();
  }
  chercherOrg()
  {
    this.organismeServices.allOrganismeAccueils()
      .subscribe(data=>{
        this.orgOrigines=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {Personnel} from '../../model/model.personnel';
import {PosteAdministrative} from '../../model/model.posteAdministrative';
import {Periode} from '../../model/model.periode';
import {PersonnelServices} from '../../services/personnel.services';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {PosteAdministrativeServices} from '../../services/posteAdministrative.services';
import {PeriodeServices} from '../../services/periode.services';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',
  styleUrls: ['./periode.component.css']
})
export class PeriodeComponent implements OnInit {
  pagePeriode: any;
  motCle: string = "";
  currentPage: number = 0;
  pages: Array<number>;
  size: number = 5;
  periode: Periode = new Periode();
  postes: Array<PosteAdministrative> = new Array<PosteAdministrative>();
  personnels: Array<Personnel> = new Array<Personnel>();
  personnel:Personnel;
  periodes: Array<Periode> = new Array<Periode>();
  posteAdmin:PosteAdministrative;
  id_periode:number;
  constructor(private periodeServices:PeriodeServices,
    private posteServices: PosteAdministrativeServices,
    public dialogRef: MatDialogRef<PeriodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
     public http: Http, public router: Router) 
     {
       this.id_periode=data.num;
  }

  ngOnInit() {
    this.doSearch();
    this.chercherPosteAdmin();
  }

  ModifierPoste() {
    this.periode.posteAdmin=this.posteAdmin;
    this.periodeServices.updatePeriode(this.periode)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
      this.Close();
  }

  chercherPosteAdmin()
  {
    this.posteServices.getAllPostes()
      .subscribe(data=>{
        this.postes=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  doSearch() {
    this.periodeServices.getPeriode(this.id_periode)
      .subscribe(data => {
        console.log(data);
        this.periode = data;
      }, err => {
        console.log(err);
      })
  }
  Close()
  {
    this.dialogRef.close();
   
  }
}

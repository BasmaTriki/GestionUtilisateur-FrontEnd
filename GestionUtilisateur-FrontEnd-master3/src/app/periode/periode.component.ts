import { Component, OnInit } from '@angular/core';
import {Personnel} from '../../model/model.personnel';
import {PosteAdministrative} from '../../model/model.posteAdministrative';
import {Periode} from '../../model/model.periode';
import {PersonnelServices} from '../../services/personnel.services';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {PosteAdministrativeServices} from '../../services/posteAdministrative.services';
import {PeriodeServices} from '../../services/periode.services';

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

  constructor(private periodeServices:PeriodeServices,private posteServices: PosteAdministrativeServices, private personnelServices: PersonnelServices, public http: Http, public router: Router) {
  }

  ngOnInit() {
    this.AfficherPersonnel();
    this.chercher();
    this.chercherPosteAdmin();
  }

  ajouter() {
    this.periode.personnel=this.personnel;
    this.periode.posteAdmin=this.posteAdmin;
    this.periodeServices.savePeriode(this.periode)
      .subscribe(data => {
        alert("Success d'ajout");
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
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
  chercherPosteAdmin()
  {
    this.posteServices.getAllPostes()
      .subscribe(data=>{
        this.postes=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  doSearch() {
    this.periodeServices.getPeriodes(this.motCle, this.currentPage, this.size)
      .subscribe(data => {
        console.log(data);
        this.periodes = data;
        this.pages = new Array(data.totalPages);
      }, err => {
        console.log(err);
      })
  }

  chercher() {
    this.periodeServices.getAllPeriodes()
      .subscribe(data => {
        this.periodes = data;
        this.pages = new Array(data.totalPages);
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  gotopage(i: number) {
    this.currentPage = i;
    this.doSearch();
  }

  onEditPeriode(id_periode: number) {
    this.router.navigate(['editPeriode', id_periode]);
  }

  onDeletePeriode(p: Periode) {
    let confirm = window.confirm("Etes-vous sûre?");
    if (confirm == true) {
      this.periodeServices.deletePeriode(p.id_periode)
        .subscribe(data => {
          this.pagePeriode.content.splice(
            this.pagePeriode.content.indexOf(p), 1
          );
          console.log(data);
        }, err => {
          console.log(err);
        })
    }
  }
}

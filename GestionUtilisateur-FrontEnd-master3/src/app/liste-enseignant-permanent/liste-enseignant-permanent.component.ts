import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import { AdministratifServices } from '../../services/administratif.services';
import { Departement } from '../../model/model.departement';
import { DepartementServices } from '../../services/departement.services';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-liste-enseignant-permanent',
  templateUrl: './liste-enseignant-permanent.component.html',
  styleUrls: ['./liste-enseignant-permanent.component.css']
})
export class ListeEnseignantPermanentComponent implements OnDestroy,OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  enseignantPs:Array<EnseignantPermanent> = new Array<EnseignantPermanent>();
  pages: Array<number>;
  pageEnseignant:any;
  motCle:string="";
  currentPage:number=0;
  size:number=5;
  departement:Departement=new Departement();
  departements:Array<Departement>=new Array<Departement>();
  motCle1:string="";
  currentPageA:number=0;
  pagesA:Array<number>;
  pageAdministratif:any;
  displayedColumns = ['matricule', 'cin', 'nom', 'prenom'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource:MatTableDataSource<EnseignantPermanent>;
  constructor(private departementServices:DepartementServices,
    private adminService:AdministratifServices,
    private enseingnantpermanentService:EnseignantPermanentServices, 
    public http: Http, public router: Router) 
    { 
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit() {
   this.chercherDepartement();
   this.doSearchEng();
   this.doSearchAdmin();
   this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5
  };
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  gotopageD(i:number)
  {
    this.currentPage=i;
    this.doSearchD();
  }
  Imprimer()
  {
    this.enseingnantpermanentService.ImprimerEnseignantPermanent(this.departement.idDep)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  doSearchEng()
  { 
     this.enseingnantpermanentService.getEnseignantPermanents(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        this.pageEnseignant=data;
        this.enseignantPs=data;
        this.dataSource.data=data;
        this.pages=new Array(data.totalPages);
        this.dtTrigger.next();
        return data.items;
      },err=>{
        console.log(err);
      })
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;

  }
  doSearchAdmin()
  {
  this.adminService.getAdministratifs(this.motCle1,this.currentPageA,this.size)
  .subscribe(data=>{
    this.pageAdministratif=data;
    this.pagesA=new Array(data.totalPages);
    console.log(data);
  },err=>{
    console.log(err);
  })
}
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearchEng();
  }
  gotopage1(i:number)
  {
    this.currentPageA=i;
    this.doSearchAdmin();
  }
  onEditEnseignant(matricule:number){
    this.router.navigate(['EditEnseignantP',matricule]);
  }
  onDetailsEnseignant(matricule:number) {
    this.router.navigate(['DetailsEnseignantP',matricule]);
  }
  onEditAdministratif(matricule:number){
    this.router.navigate(['EditAdministratif',matricule]);
  }
  chercherDepartement()
  {
    this.departementServices.allDepartements()
      .subscribe(data=>{
        this.departements=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  doSearchD()
  {
    this.enseingnantpermanentService.getEnseignantPermanentDepartement(this.departement.idDep,this.currentPage,this.size)
    .subscribe(data=>{
      this.pageEnseignant=data;
      this.pages=new Array(data.totalPages);
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
export interface Element {
  Matricule: number;
  cin:number;
  nom:string;
  prenom:string;
  adresse:string;
  telephone:string;
  email:string;
  departement:Departement;
}


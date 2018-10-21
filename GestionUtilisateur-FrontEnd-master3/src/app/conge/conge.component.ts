import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {CongeServices} from '../../services/conge.services';
import {Conge} from '../../model/model.conge';
import {Personnel} from '../../model/model.personnel';
import {PersonnelServices} from '../../services/personnel.services';
import {TypeConge} from '../../model/model.typeConge';
import {TypeCongeServices} from '../../services/typeConge.services';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import { EnseignantPermanent } from '../../model/model.enseignantpermanent';
import { AdministratifServices } from '../../services/administratif.services';
import {MatDialog} from '@angular/material';
import { ModalCongeComponent } from '../modal-conge/modal-conge.component';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-conges',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  pageConge:any;
  motCle:string="";
  motCle1:string="";
  currentPage:number=0;
  pages:Array<number>;
  currentPageA:number=0;
  pagesA:Array<number>;
  size:number=1000;
  conge:Conge= new Conge();
  personnels: Array<Personnel> = new Array<Personnel>();
  personnel:Personnel;
  pageEnseignant:any;
  pageAdministratif:any;
  typeconge:TypeConge=new TypeConge();
  typeconges:Array<TypeConge> =new Array<TypeConge>();
  nbjour:number=0;
  nbjourRest:number=0;
  Sommenbjour:number=0;
  enseignantPs:Array<EnseignantPermanent>=new Array<EnseignantPermanent>();
  nom:string="";
  dataTable: any;
  lang:string;
  nomAr:string;
  TypePersonnel = [
    {value: 'Enseignant'},
    {value: 'Administratif'}
  ];
  type:string="";
  TypePersonnelAr = [
    {value: 'أستاذ'},
    {value: 'إداري'}
  ];
  constructor(public dialog: MatDialog,
    private adminService:AdministratifServices,
    private enseingnantpermanentService:EnseignantPermanentServices,
    private congeServices:CongeServices, 
    private typeCongeServices:TypeCongeServices,
    private personnelServices: PersonnelServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public router:Router) 
    {
      this.lang=sessionStorage.getItem("lang");
      if(this.lang=='fr')
      {
      this.type="Enseignant";
      }
      if(this.lang=='ar')
      {
      this.type="أستاذ";
      }
     }

  ngOnInit() {
    this.doSearchEng();
  }
  onEditConge(idCong:number){
    this.router.navigate(['editConge',idCong]);
  }
/*   onDeleteConge(c:Conge){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.congeServices.deleteConge(c.idCong)
        .subscribe(data=> {
          this.pageConge.content.splice(
            this.pageConge.content.indexOf(c),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  } */
  doSearchEng()
  { if(this.type=="Enseignant"||this.type=="أستاذ")
  {
     this.enseingnantpermanentService.getEnseignantPermanentPrenom(this.motCle,this.currentPage,this.size)
     .subscribe((data: any[]) => {
      this.pageEnseignant = data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
    }
    else if(this.type=="Administratif"||this.type=="إداري")
    {
      this.adminService.getAdministratifs(this.motCle1,this.currentPageA,this.size)
      .subscribe((data: any[]) => {
        this.pageEnseignant = data;
        this.chRef.detectChanges();
        // Now you can use jQuery DataTables :
        const table: any = $('table');
        this.dataTable = table.DataTable();
        },err=>{
          console.log(err);
        })
    }
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
  ajouterConge(p:Personnel)
  {
    if(p!=null)
    {
      this.nom=p.prenom+" "+p.nom;
      this.nomAr=p.prenomAr+" "+p.nomAr;
    }
    this.personnel=p;
    if(this.lang=='fr')
    {
      let dialogRef = this.dialog.open(ModalCongeComponent, {data:{name:this.nom,idPers:p.idPers}});
    }
    if(this.lang=='ar')
    {
      let dialogRef = this.dialog.open(ModalCongeComponent, {data:{name:this.nomAr,idPers:p.idPers}});
    }
  }
  EtatConge(p:Personnel)
  {
    this.router.navigate(['historiqueConge',p.idPers]);
  }
}

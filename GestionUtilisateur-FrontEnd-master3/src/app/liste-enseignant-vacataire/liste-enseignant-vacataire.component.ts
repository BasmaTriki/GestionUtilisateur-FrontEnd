import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnseignantLibreServices } from '../../services/enseignantlibre.services';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';

@Component({
  selector: 'app-liste-enseignant-vacataire',
  templateUrl: './liste-enseignant-vacataire.component.html',
  styleUrls: ['./liste-enseignant-vacataire.component.css']
})
export class ListeEnseignantVacataireComponent implements OnInit {
  pages: Array<number>;
  pageEnseignantLibre:any;
  motCle:string="";
  currentPage:number=0;
  size:number=5;
  motCle1:string="";
  currentPageA:number=0;
  pagesA:Array<number>;
  pageEnseignantFonct:any;
  constructor(private enseignantFonctService:EnseignantFonctionnaireEtatServices,
    private enseingnantlibreService:EnseignantLibreServices, 
    public http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.doSearchEngL();
    this.doSearchEngFonct();
  }
  doSearchEngL()
  { 
     this.enseingnantlibreService.getEnseignantLibres(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        this.pageEnseignantLibre=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
  }
  doSearchEngFonct()
  {
  this.enseignantFonctService.getEnseignantFonctionnaireEtats(this.motCle1,this.currentPageA,this.size)
  .subscribe(data=>{
    this.pageEnseignantFonct=data;
    this.pagesA=new Array(data.totalPages);
    console.log(data);
  },err=>{
    console.log(err);
  })
}
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearchEngL();
  }
  gotopage1(i:number)
  {
    this.currentPageA=i;
    this.doSearchEngFonct();
  }
  onEditEnseignant(matricule:number){
    this.router.navigate(['EditEnseignantP',matricule]);
  }
  onDetailsEnseignant(matricule:number) {
    this.router.navigate(['DetailsEnseignantP',matricule]);
  }
}

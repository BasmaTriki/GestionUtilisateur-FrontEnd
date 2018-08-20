import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Personnel} from "../../model/model.personnel";
import * as $ from 'jquery';
import { CongeServices } from '../../services/conge.services';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  static idUser:number;
  personnel:Personnel=new Personnel();
  nom:string;
  nom_demande:string;
  type:string;
  nomberConge:number=0;
  currentPage: number = 0;
  size: number = 5;
  pageConge: any;
  role:string;
  langu:string;
  nomAr:String;
  constructor(private congeServices: CongeServices,
    public activatedRoute:ActivatedRoute,
    private demandeServices:DemandeVacationServices,
    private translate: TranslateService,
    public router:Router)
  {
    if(sessionStorage.getItem('nom')!=null)
    {
    this.nom=sessionStorage.getItem('nom');
    this.type=sessionStorage.getItem('type');
    this.role=sessionStorage.getItem('role');
    this.nomAr=sessionStorage.getItem('nomAr');
    }
  }
  ngOnInit() {
    if(this.role=="Admin")
    {
      this.doSearch();
    }
    if(this.role=="AgentGRH")
    {
      this.doSearchDemandeAccepter();
    }
    if(this.role=="DirecteurES")
    {
      this.doSearchDemande();
    }
  }
  toggleClicked(event: MouseEvent)
  {
      var target = event.srcElement.id;
      var body = $('body');
      var menu = $('#sidebar-menu');
      
      // toggle small or large menu
      if (body.hasClass('nav-md')) {
          menu.find('li.active ul').hide();
          menu.find('li.active').addClass('active-sm').removeClass('active');
      } else {
          menu.find('li.active-sm ul').show();
          menu.find('li.active-sm').addClass('active').removeClass('active-sm');
      }
      body.toggleClass('nav-md nav-sm');

  }
  doSearch() {
    this.congeServices.getConges("en-attente", this.currentPage, this.size)
      .subscribe(data => {
        this.pageConge=data;
        this.nomberConge=data.totalElements;
        this.nom_demande=this.pageConge.personnel.prenom+" "+this.pageConge.personnel.nom;
      }, err => {
        console.log(err);
      })
  }
  doSearchDemande() {
    this.demandeServices.getEtatDemandeVacation("en-attente", this.currentPage, this.size)
      .subscribe(data => {
        this.pageConge=data;
        this.nomberConge=data.totalElements;
        this.nom_demande=data.prenom+" "+data.nom;
      }, err => {
        console.log(err);
      })
  }
  doSearchDemandeAccepter() {
    this.demandeServices.getEtatDemandeVacation("accepter", this.currentPage, this.size)
      .subscribe(data => {
        this.pageConge=data;
        this.nomberConge=data.totalElements;
        this.nom_demande=data.prenom+" "+data.nom;
      }, err => {
        console.log(err);
      })
  }
}

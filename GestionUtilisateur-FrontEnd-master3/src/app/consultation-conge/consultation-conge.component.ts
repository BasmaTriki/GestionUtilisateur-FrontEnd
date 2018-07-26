import { Component, OnInit } from '@angular/core';
import {CongeServices} from '../../services/conge.services';
import {Conge} from '../../model/model.conge';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Personnel} from '../../model/model.personnel';

@Component({
  selector: 'app-consultation-conge',
  templateUrl: './consultation-conge.component.html',
  styleUrls: ['./consultation-conge.component.css']
})
export class ConsultationCongeComponent implements OnInit {
  pageConge: any;
  pageCongeA: any;
  motCle: string = "en-attente";
  currentPage: number = 0;
  currentPageA: number = 0;
  pages: Array<number>;
  pagesA: Array<number>;
  size: number = 5;
  conge: Conge = new Conge();
  conges: Array<Conge> = new Array<Conge>();
  personnels: Array<Personnel> = new Array<Personnel>();

  constructor(private congeServices: CongeServices, public http: Http, public router: Router) {
  }

  ngOnInit() {
    this.doSearch();
    this.doSearchnonautoriser();
  }

  accepter(c: Conge) {
    c.valide = "accepte";
    this.congeServices.updateConge(c)
      .subscribe(data => {
        this.pageConge.content.splice(
          this.pageConge.content.indexOf(c), 1
        );
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  valider(c: Conge) {
    c.valide = "validé";
    this.congeServices.updateConge(c)
      .subscribe(data => {
        this.pageCongeA.content.splice(
          this.pageCongeA.content.indexOf(c), 1
        );
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  refuser(c: Conge) {
    let confirm = window.confirm("Etes-vous sûre?");
    if (confirm == true) {
      c.valide = "refuse";
      this.congeServices.updateConge(c)
        .subscribe(data => {
          this.pageConge.content.splice(
            this.pageConge.content.indexOf(c), 1
          );
          console.log(data);
        }, err => {
          console.log(err);
        })
    }
  }

  doSearch() {
    this.congeServices.getCongesAutoriser(true,this.motCle, this.currentPage, this.size)
      .subscribe(data => {
        console.log(data);
        this.pageConge = data;
        this.pages = new Array(data.totalPages);
      }, err => {
        console.log(err);
      })
  }

  gotopage(i: number) {
    this.currentPage = i;
    this.doSearch();
  }
  doSearchnonautoriser() {
    this.congeServices.getCongesAutoriser(false,this.motCle, this.currentPage, this.size)
      .subscribe(data => {
        console.log(data);
        this.pageCongeA = data;
        this.pagesA = new Array(data.totalPages);
      }, err => {
        console.log(err);
      })
  }

  gotopage1(i: number) {
    this.currentPageA = i;
    this.doSearchnonautoriser();
  }
}



import { Component, OnInit } from '@angular/core';
import {CongeServices} from '../../services/conge.services';
import {Conge} from '../../model/model.conge';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Personnel} from '../../model/model.personnel';
import {UsersServices} from '../../services/users.services';

@Component({
  selector: 'app-consultation-conge',
  templateUrl: './consultation-conge.component.html',
  styleUrls: ['./consultation-conge.component.css']
})
export class ConsultationCongeComponent implements OnInit {
  pageConge: any;
  motCle: string = "en-attente";
  currentPage: number = 0;
  pages: Array<number>;
  size: number = 5;
  conge: Conge = new Conge();
  conges: Array<Conge> = new Array<Conge>();
  personnels: Array<Personnel> = new Array<Personnel>();

  constructor(private congeServices: CongeServices, private userservices: UsersServices, public http: Http, public router: Router) {
  }

  ngOnInit() {
    //this.chercher();
    this.doSearch();
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
    this.congeServices.getConges(this.motCle, this.currentPage, this.size)
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
  CalculerNbj(c:Conge)
  {
     return ((Number(c.dateFin) - Number(c.dateDebut))/86400000)+1;
  }
}



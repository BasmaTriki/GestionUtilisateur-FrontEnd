import { Component, OnInit } from '@angular/core';
import { Specialite } from '../../model/model.specialite';
import { EnseignantFonctionnaireEtat } from '../../model/model.enseignantFonctEtat';
import { Departement } from '../../model/model.departement';
import { Etat } from '../../model/model.etat';
import { ActivatedRoute } from '@angular/router';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';
import { Http } from '@angular/http';

@Component({
  selector: 'app-edit-enseignant-fonctionnaire',
  templateUrl: './edit-enseignant-fonctionnaire.component.html',
  styleUrls: ['./edit-enseignant-fonctionnaire.component.css']
})
export class EditEnseignantFonctionnaireComponent implements OnInit {
  idPers:number;
  specialite:Specialite = new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  enseignantFoncEtat:EnseignantFonctionnaireEtat=new EnseignantFonctionnaireEtat();
  departements: Array<Departement> = new Array<Departement>();
  departement:Departement;
  etat:Etat=new Etat();
  etats:Array<Etat>=new Array<Etat>();
  
    constructor(public activatedRoute:ActivatedRoute,
      private enseignantServices:EnseignantFonctionnaireEtatServices,
                public http: Http) 
    {
      this.idPers=activatedRoute.snapshot.params['idPers'];
     }
  
    ngOnInit() {
      this.enseignantServices.getEnseignantFonctionnaireEtat(this.idPers)
      .subscribe(data=>{
        this.enseignantFoncEtat=data;
       this.departement=this.enseignantFoncEtat.departement;
       this.specialite=this.enseignantFoncEtat.specialite;
       this.etat=this.enseignantFoncEtat.etat;
      },err=>{
        console.log(err);
      });
    }
}

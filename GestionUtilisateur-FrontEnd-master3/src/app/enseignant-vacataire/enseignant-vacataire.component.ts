import { Component, OnInit } from '@angular/core';
import {Enfant} from '../../model/model.enfant';
import {EnfantServices} from '../../services/enfant.services';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { DemandeVacation } from '../../model/model.demandeVacation';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SpecialiteServices } from '../../services/specialite.services';
import { Specialite } from '../../model/model.specialite';

@Component({
  selector: 'app-enseignant-vacataire',
  templateUrl: './enseignant-vacataire.component.html',
  styleUrls: ['./enseignant-vacataire.component.css']
})
export class EnseignantVacataireComponent implements OnInit {
  demandeVacation:DemandeVacation=new DemandeVacation();
  specialites:Array<Specialite>=new Array<Specialite>();
  selectedFile:File=null;
  specialite:Specialite=new Specialite();
  constructor(private demandeVacationService:DemandeVacationServices,
    private specialiteService:SpecialiteServices,
    public http: Http,
    public router: Router)
     { }

  ngOnInit() {
    this.chercherSpecialite();
  }
  Enregistrer(){
    this.demandeVacation.specialite=this.specialite;
    console.log(this.specialite);
    this.demandeVacation.etatdemande="en-attente";
    this.demandeVacationService.saveDemandeVacation(this.demandeVacation)
    .subscribe(data=>{
      alert("Success d'ajout");
      console.log(data);
      this.upload(data.idDemande)
    },err=>{
      console.log(err);
    });
  
  }
  chercherSpecialite()
  {
    this.specialiteService.allSpecialites()
    .subscribe(data=>{
      this.specialites=data;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }
  onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
upload(idDemande:number)
{
  const fb=new FormData();
  fb.append('uploadDiplome',this.selectedFile,this.selectedFile.name);
 this.http.post("http://localhost:8080/uploadDiplome/"+idDemande,fb)
 .subscribe(res=>{
   console.log(res);
 })
}
  annuler(){
  }
}

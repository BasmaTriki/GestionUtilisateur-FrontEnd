import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';
import { EnseignantLibre } from '../../model/model.enseignantLibre';
import { EnseignantFonctionnaireEtat } from '../../model/model.enseignantFonctEtat';
import { Departement } from '../../model/model.departement';
import { Diplome } from '../../model/model.diplome';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { Specialite } from '../../model/model.specialite';
import { EnseignantLibreServices } from '../../services/enseignantlibre.services';
import { DepartementServices } from '../../services/departement.services';
import { DiplomeServices } from '../../services/diplome.services';
import { SpecialiteServices } from '../../services/specialite.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';

@Component({
  selector: 'app-ajouter-vacataire',
  templateUrl: './ajouter-vacataire.component.html',
  styleUrls: ['./ajouter-vacataire.component.css']
})
export class AjouterVacataireComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  currentPage: number = 0;
  pages: Array<number>;
  size: number = 5;
  type:string="";
  enseignantLibre:EnseignantLibre=new EnseignantLibre();
  enseignantFonct:EnseignantFonctionnaireEtat=new EnseignantFonctionnaireEtat();
  departements: Array<Departement> = new Array<Departement>();
  departement:Departement;
  panelOpenState: boolean = false;
  diplomes: Array<Diplome> = new Array<Diplome>();
  diplome:Diplome=new Diplome();
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  specialite:Specialite=new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  selectedFile:File=null;
  TypeEnseignant = [
    {value: 'Enseignant Libre'},
    {value: 'Enseignant Fonctionnaire'}
  ];
  constructor(private enseingnantlibreService:EnseignantLibreServices,
    private enseignantFonctServices:EnseignantFonctionnaireEtatServices,
    private departementServices: DepartementServices,
    private diplomeService:DiplomeServices,
    private specialiteServices:SpecialiteServices,
    private diplomePServices:DiplomePersonnelServices,
    public http: HttpClient,
    public router: Router) { }

  ngOnInit() {
   this.chercherDep();
    this.chercherDip();
    this.chercherSpecialite();
    this.diplomep.diplome=this.diplome;
    this.diplomepers.push(this.diplomep);
    console.log(this.type);
  }
  chercherSpecialite()
  {
    this.specialiteServices.allSpecialites()
      .subscribe(data=>{
        this.specialites=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercherDip() {
    this.diplomeService.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  EnregistrerDiplomeP(en:EnseignantLibre) {
    for (let dip of this.diplomepers) {
      dip.personnel = en;
      this.diplomePServices.saveDiplomePersonnel(dip)
        .subscribe(data => {
          console.log("Success d'ajout diplomes");
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }
  Enregistrer() {
  this.enseignantLibre.departement=this.departement;
  this.enseignantLibre.specialite=this.specialite;
  //this.enseignantP.pos
  this.enseingnantlibreService.saveEnseignantLibre(this.enseignantLibre)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        this.EnregistrerDiplomeP(data);
      },err=>{
        console.log(err);
      });

  }
  EnregistrerFonct()
  {
    this.enseignantFonct.departement=this.departement;
    this.enseignantFonct.specialite=this.specialite;
    //this.enseignantP.pos
    this.enseignantFonctServices.saveEnseignantFonctionnaireEtat(this.enseignantFonct)
        .subscribe(data=>{
          alert("Success d'ajout");
          console.log(data);
          this.EnregistrerDiplomeP(data);
        },err=>{
          console.log(err);
        });
  }

  chercherDep() {
    this.departementServices.allDepartements()
      .subscribe(data => {
        this.departements = data;
        this.pages = new Array(data.totalPages);
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
 ajouterDiplome()
  {
    this.diplomep=new DiplomePersonnel();
    this.diplomep.diplome=new Diplome();
    this.diplomepers.push(this.diplomep);
    console.log(this.type);
  }
  onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
upload(idCong:number)
{
  const fb=new FormData();
  fb.append('uploadfile',this.selectedFile,this.selectedFile.name);
 this.http.post("http://localhost:8080/uploadFile/"+idCong,fb)
 .subscribe(res=>{
   console.log(res);
 })
}
}
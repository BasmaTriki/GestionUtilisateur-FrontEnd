import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {CongeServices} from '../../services/conge.services';
import {Conge} from '../../model/model.conge';
import {Personnel} from '../../model/model.personnel';
import {PersonnelServices} from '../../services/personnel.services';
import {TypeConge} from '../../model/model.typeConge';
import {TypeCongeServices} from '../../services/typeConge.services';

@Component({
  selector: 'app-conges',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  pageConge:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  conge:Conge= new Conge();
  personnels: Array<Personnel> = new Array<Personnel>();
  personnel:Personnel;
  typeconge:TypeConge=new TypeConge();
  typeconges:Array<TypeConge> =new Array<TypeConge>();
  nbjour:number=0;
  nbjourRest:number=0;
  constructor(private congeServices:CongeServices, private typeCongeServices:TypeCongeServices,private personnelServices: PersonnelServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.AfficherPersonnel();
    this.AfficherTypeConge();
  }
  ajouter(){
    this.conge.typeconge=this.typeconge;
    this.conge.personnel=this.personnel;
    this.conge.nbJour=this.nbjour;
    this.conge.valide="en-attente";
    this.congeServices.saveConge(this.conge)
      .subscribe(data=>{
        alert("Succès d'ajout");
        console.log(data);
        this.personnel.conges.push(data);
        this.personnelServices.updatePersonnel(this.personnel);
        console.log(data);
      },err=>{
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
  AfficherTypeConge()
  {
    this.typeCongeServices.allTypesConges()
      .subscribe(data=>{
        this.typeconges=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  onEditConge(idCong:number){
    this.router.navigate(['editConge',idCong]);
  }
  onDeleteConge(c:Conge){
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
  }
  CalculerNbjour()
  {if(this.conge.dateFin!=null && this.conge.dateDebut!=null)
    return this.nbjour=((Number(this.conge.dateFin) - Number(this.conge.dateDebut))/86400000)+1;
  else
    return 0;
  }
  CalculerResteJour()
  {
    if(this.conge.typeconge!=null && this.conge.personnel!=null)
  {
    this.congeServices.getNbJourParType(this.personnel.matricule,this.typeconge.libelle,this.currentPage,this.size)
      .subscribe(data=>{
       this.pageConge=data;
        for(let c of data)
        {
          this.nbjourRest+=c.nbJour;
        }
        console.log(data);
      },err=>{
        console.log(err);
      });

    return this.typeconge.nbMaxJrs-this.nbjourRest;
  }
  else
    return 0;
  }

}

import { Specialite } from "./model.specialite";

export class DemandeVacation{
  idDemande:number;
  cin:number;
  nom:string="";
  prenom:string="";
  nomAr:string="";
  prenomAr:string="";
  email:string="";
  telephone:string="";
  adresse:string="";
  adresseAr:string="";
  ville:string="";
  codePostal:number;
  specialite:Specialite;
  diplomes:string=""; 
  etatdemande:string="";
  typeDemande:string="";
}

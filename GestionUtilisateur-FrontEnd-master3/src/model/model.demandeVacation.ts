import { Specialite } from "./model.specialite";

export class DemandeVacation{
  idDemande:number;
  cin:number;
  nom:string="";
  prenom:string="";
  email:string="";
  telephone:string="";
  adresse:string="";
  ville:string="";
  codePostal:number;
  specialite:Specialite;
  diplomes:string=""; 
  etatdemande:string="";
  typeDemande:string="";
}

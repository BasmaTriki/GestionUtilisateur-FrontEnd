import { Specialite } from "./model.specialite";

export class DemandeVacation{
  idDemande:number;
  cin:string="";
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
  dateCreationDem:Date=null;
  datenaissance:Date=null;
  nompere:string="";
  nompereAr:string="";
  lieuNaissance:string="";
  lieuNaissanceAr:string="";
  rib:string="";
  etatCivil:string="";
}

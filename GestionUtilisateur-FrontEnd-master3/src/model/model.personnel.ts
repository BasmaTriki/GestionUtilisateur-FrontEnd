import {Conge} from "./model.conge";

export class Personnel{
  matricule:number;
  cin:number;
  nom:string="";
  prenom:string="";
  adresse:string="";
  telephone:string="";
  email:string="";
  datenaissance:Date;
  lieuNaissance:string="";
  codepostal:number;
  sexe:string="";
  rib:string="";
  etatCivil:string="";
  nomConjoint:string="";
  profConjoint:string="";
  nompere:string="";
  conges:Array<Conge>=new Array<Conge>();
}

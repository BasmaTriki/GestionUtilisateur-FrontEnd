import {Conge} from "./model.conge";
import {Enfant} from "./model.enfant";
import {Mutation} from "./model.mutation";
import { Role } from "./model.role";

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
  etat:boolean;
  login:string="";
  motpasse:string="";
  conges:Array<Conge>;
  enfants:Array<Enfant>;
  mutation:Array<Mutation>;
  role:Role;
}

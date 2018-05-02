import {Personnel} from "./model.personnel";
import {Departement} from "./model.departement";
import {Corps} from "./model.corps";

export class Enseignant extends Personnel {
  specialite:string="";
  etat:string="";
  departement:Departement=null;
  corps:Corps=null;
}

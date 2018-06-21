import {Personnel} from "./model.personnel";
import {Departement} from "./model.departement";
import {Corps} from "./model.corps";
import {Specialite} from "./model.specialite";

export class Enseignant extends Personnel {
  specialite:Specialite;
  departement:Departement;
  corps:Corps=null;
}

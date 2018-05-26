import {Semestre} from "./model.semestre";

export class Anneeuniversitaire
{
  id:number;
  anneeDebut:number;
  anneeFin:number;
  semestres:Array<Semestre>=new Array<Semestre>();
}

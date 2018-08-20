import { EnseignantLibre } from "./model.enseignantLibre";
import { AnneeUniversitaire } from "./model.anneeuniversitaire";
import { Semestre } from "./model.semestre";

export class ChargeSem
{
  idChargeS:number;
  nbHeure:number;
  enseignantLibre:EnseignantLibre;
  anneeuniversitaire:AnneeUniversitaire;
  semestre:Semestre;
}

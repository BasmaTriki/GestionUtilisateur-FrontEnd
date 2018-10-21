import { AnneeUniversitaire } from "./model.anneeuniversitaire";
import { Semestre } from "./model.semestre";
import { EnseignantVacataire } from "./model.enseignantVacataire";

export class ChargeSem
{
  idChargeS:number;
  nbHeure:number;
  enseignantvacataire:EnseignantVacataire;
  anneeuniversitaire:AnneeUniversitaire;
  semestre:Semestre;
  nbrHeuresTD:number;
  nbrHeuresTP:number;
  nbrHeuresCR:number;
}

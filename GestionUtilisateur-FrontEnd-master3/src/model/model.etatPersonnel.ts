import { Etat } from "./model.etat";
import { Personnel } from "./model.personnel";
import { Organisme } from "./model.organisme";

export class EtatPersonnel {
  idEtatP:number=0;
  etat:Etat;
  personnel:Personnel;
  etatInactive:string="";
  etatInactiveAr:string="";
  lieuDetachement:Organisme=null;
  dateDebutDet:Date;
  dateFinDet:Date;
}

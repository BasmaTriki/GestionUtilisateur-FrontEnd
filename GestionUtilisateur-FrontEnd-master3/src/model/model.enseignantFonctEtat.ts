import {Enseignant} from "./model.enseignant";
import { EnseignantVacataire } from "./model.enseignantVacataire";
export class EnseignantFonctionnaireEtat extends EnseignantVacataire {
autorisation:string="";
nbreMaxHeures:number;
}

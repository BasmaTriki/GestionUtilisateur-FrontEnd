import {Enseignant} from "./model.enseignant";
import {Enfant} from "./model.enfant";

export class EnseignantPermanent extends Enseignant {
dateRecrutement:Date=null;
dateTitularisation:Date=null;
enfants:Array<Enfant>=new Array<Enfant>();
}

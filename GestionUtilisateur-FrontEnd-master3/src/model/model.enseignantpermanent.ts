import {Enseignant} from "./model.enseignant";
import {Enfant} from "./model.enfant";

export class EnseignantPermanent extends Enseignant {
dateRecrutement:Date=null;
dateDemarcation:Date=null;
enfant:Array<Enfant>=new Array<Enfant>();
}

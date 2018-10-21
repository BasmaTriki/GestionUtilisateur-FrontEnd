import { EnseignantPermanent } from "./model.enseignantpermanent";
export class Contrat {
 idContrat:number;
 dateDebutCont:Date;
 dateFinCont:Date;
 enseignantPermanent:EnseignantPermanent=null;
}

import {Personnel} from "./model.personnel";
import {TypeMutation} from "./model.typeMutation";
import {OrganismeAccueil} from "./model.organismeAccueil";

export class Mutation{
  idMut:number=0;
  organismeAccueil:OrganismeAccueil;
  personnel:Personnel=null;
  typemutation:TypeMutation=null;
  date_mut:Date;
}

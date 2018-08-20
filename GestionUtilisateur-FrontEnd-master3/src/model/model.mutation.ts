import {Personnel} from "./model.personnel";
import {TypeMutation} from "./model.typeMutation";
import {Organisme} from "./model.organisme";

export class Mutation{
  idMut:number=0;
  organismeAccueil:Organisme;
  personnel:Personnel=null;
  typemutation:TypeMutation=null;
  date_mut:Date;
}

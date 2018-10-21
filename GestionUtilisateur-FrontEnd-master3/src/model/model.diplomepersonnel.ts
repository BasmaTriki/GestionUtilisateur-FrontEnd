import {Personnel} from "./model.personnel";
import {Diplome} from "./model.diplome";
import { Organisme } from "./model.organisme";
export class DiplomePersonnel{
  id_DipP:number=0;
  date:Date=null;
  personnel:Personnel=null;
  diplome:Diplome=null;
  organisme:Organisme=null;
}

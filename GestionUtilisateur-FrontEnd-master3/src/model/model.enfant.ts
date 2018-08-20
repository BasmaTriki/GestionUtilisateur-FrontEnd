import {Personnel} from "./model.personnel";

export class Enfant {
  num:number;
  nom:string="";
  nomAr:string="";
  dateNais:Date=new Date();
  personnel:Personnel=null;
}

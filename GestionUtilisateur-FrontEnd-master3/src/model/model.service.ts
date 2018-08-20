import {Administratif} from "./model.administratif";

export class Service{
  idServ:number;
  libelleServ:string="";
  libelleServAr:string="";
  administratif:Array<Administratif>=new Array<Administratif>();
}

import {Administratif} from "./model.administratif";

export class Service{
  idServ:number;
  libelle:string="";
  administratif:Array<Administratif>=new Array<Administratif>();
}

import {Personnel} from "./model.personnel";
import {Service} from "./model.service";
export class Administratif extends Personnel{
  taille:string;
  pointure:number;
  service:Service=null;
}

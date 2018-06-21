import {Personnel} from './model.personnel';

export class User{
  idUser:number;
  login:string="";
  motpasse:string="";
  datecreation:Date=null;
  personnel:Personnel=null;
}

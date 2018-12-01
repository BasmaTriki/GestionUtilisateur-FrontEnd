import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Personnel} from "../model/model.personnel";

@Injectable()
export class PersonnelServices {
  isAuth = false;
  constructor(public http: Http) {
  }

getMatPersonnel(matricule:String) {
    return this.http.get("http://localhost:8080/chercherMatriculePersonnel?mc=" + matricule)
      .map(resp => resp.json())
  }
  EmailNouvelleCmp(idPers:number)
  {
    return this.http.get("http://localhost:8080/NouvelleComptePersonnel/"+idPers)
      .map(resp=>resp.json())
  }
  EmailMotPassOblier(idPers:number,mail:string)
  {
    return this.http.get("http://localhost:8080/MotPassOblierPersonnel?id="+idPers+"&mail="+mail)
      .map(resp=>resp.json())
  }
  getPersonnel(idPers: number) {
    return this.http.get("http://localhost:8080/Personnel/"+idPers)
      .map(resp => resp.json())
  }

  savePersonnel(personnel:Personnel) {
    return this.http.post("http://localhost:8080/AjouterPersonnel", personnel)
      .map(resp => resp.json())
  }

  updatePersonnel(personnel:Personnel) {
    return this.http.put("http://localhost:8080/ModifierPersonnel/" + personnel.idPers, personnel)
      .map(resp => resp.json())
  }

  deletePersonnel(idPers: number) {
    return this.http.delete("http://localhost:8080/SupprimerPersonnel/" + idPers)
      .map(resp => resp.json())
  }
  getAllPersonnel()
  {
    return this.http.get("http://localhost:8080/Personnels")
      .map(resp=>resp.json())
  }
  
  getPersonnelLogin(login:string,motpasse:string)
  {  this.isAuth=true;
    return this.http.get("http://localhost:8080/chercherPersonnelLogin?mc="+login+"&mp="+motpasse)
      .map(resp=>resp.json())
  }
  getPersonnelsLogin(etat:number)
  {
    return this.http.get("http://localhost:8080/chercherPersonnel?mc="+etat)
      .map(resp=>resp.json())
  }
  
  getPersonnelsCompte(login:string, page: number, size: number)
  {
    return this.http.get("http://localhost:8080/chercherPersonnelActif?mc="+login+ "&size=" + size + "&page=" + page)
      .map(resp=>resp.json())
  }
}

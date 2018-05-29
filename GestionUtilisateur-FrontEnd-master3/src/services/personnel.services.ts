import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {EnseignantPermanent} from "../model/model.enseignantpermanent";
import {Personnel} from "../model/model.personnel";

@Injectable()
export class PersonnelServices {
  constructor(public http: Http) {
  }

/*  getPersonnels(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherPersonnels?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }*/

  getPersonnel(matricule: number) {
    return this.http.get("http://localhost:8080/Personnel/" + matricule)
      .map(resp => resp.json())
  }

  savePersonnel(personnel:Personnel) {
    return this.http.post("http://localhost:8080/AjouterPersonnel", personnel)
      .map(resp => resp.json())
  }

  updatePersonnel(personnel:Personnel) {
    return this.http.put("http://localhost:8080/ModifierPersonnel/" + personnel.matricule, personnel)
      .map(resp => resp.json())
  }

  deletePersonnel(matricule: number) {
    return this.http.delete("http://localhost:8080/SupprimerPersonnel/" + matricule)
      .map(resp => resp.json())
  }
  getAllPersonnel()
  {
    return this.http.get("http://localhost:8080/Personnels")
      .map(resp=>resp.json())
  }
}

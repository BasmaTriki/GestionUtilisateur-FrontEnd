import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {DemandeVacation} from "../model/model.demandeVacation";
@Injectable()
export class DemandeVacationServices {
  constructor(public http: Http) {
  }

  getDemandeVacations(motcle:string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherdemandeVacation?mc="+motcle+"&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  } 
  getEtatDemandeVacation(motcle:string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEtatdemande?mc="+motcle+"&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getDemandeVacation(idDemande: number) {
    return this.http.get("http://localhost:8080/demandeVacation/" +idDemande)
      .map(resp => resp.json())
  }

  saveDemandeVacation(demandeVacation: DemandeVacation) {
    return this.http.post("http://192.168.43.227:8080/AjouterdemandeVacation", demandeVacation)
      .map(resp => resp.json())
  }

  updateDemandeVacation(demandeVacation: DemandeVacation) {
    return this.http.put("http://localhost:8080/ModifierdemandeVacation/" + demandeVacation.idDemande, demandeVacation)
      .map(resp => resp.json())
  }

  deleteDemandeVacation(idDemande: number) {
    return this.http.delete("http://localhost:8080/SupprimerdemandeVacation/"+idDemande)
      .map(resp => resp.json())
  }
  getAllDemandeVacations() {
    return this.http.get("http://localhost:8080/demandeVacations")
      .map(resp => resp.json())
  }
}

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {EnseignantPermanent} from "../model/model.enseignantpermanent";
import { EnseignantFonctionnaireEtat } from '../model/model.enseignantFonctEtat';

@Injectable()
export class EnseignantFonctionnaireEtatServices {
  constructor(public http: Http) {
  }

  getEnseignantFonctionnaireEtats(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantFonctionnaireEtat?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  /*getEnseignantPermanentPrenom(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantPrenom?mp=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getEnseignantPermanentDepartement(motCle:number, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantDepartement?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }*/
  
  getEnseignantFonctionnaireEtat(idPers: number) {
    return this.http.get("http://localhost:8080/EnseignantFonctionnaireEtat/" + idPers)
      .map(resp => resp.json())
  }

  saveEnseignantFonctionnaireEtat(enseignantFonctionnaireEtat: EnseignantFonctionnaireEtat) {
    return this.http.post("http://localhost:8080/AjouterEnseignantFonctionnaireEtat", enseignantFonctionnaireEtat)
      .map(resp => resp.json())
  }

  updateEnseignantPermanent(enseignantFonctionnaireEtat: EnseignantFonctionnaireEtat) {
    return this.http.put("http://localhost:8080/ModifierEnseignantFonctionnaireEtat/" +enseignantFonctionnaireEtat.idPers,enseignantFonctionnaireEtat)
      .map(resp => resp.json())
  }

  deleteEnseignantPermanent(idPers: number) {
    return this.http.delete("http://localhost:8080/SupprimerEnseignantFonctionnaireEtat/" + idPers)
      .map(resp => resp.json())
  }
  getAllEnseignantPermanents() {
    return this.http.get("http://localhost:8080/EnseignantsFonctionnaireEtats")
      .map(resp => resp.json())
  }
 /* ImprimerEnseignantPermanent(idDep: number) {
    return this.http.get("http://localhost:8080/ListePersonnelDepartement?mc="+idDep)
      .map(resp => resp.json())
  }*/
  
}

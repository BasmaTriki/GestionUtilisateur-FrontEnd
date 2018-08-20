import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {EnseignantPermanent} from "../model/model.enseignantpermanent";

@Injectable()
export class EnseignantPermanentServices {
  constructor(public http: Http) {
  }

  getEnseignantPermanents(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantPermanent?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getEnseignantPermanentPrenom(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantPrenom?mp=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getEnseignantPermanentDepartement(motCle:number, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantDepartement?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  
  getEnseignantPermanent(matricule: number) {
    return this.http.get("http://localhost:8080/EnseignantPermanent/" + matricule)
      .map(resp => resp.json())
  }

  saveEnseignantPermanent(enseignantpermanent: EnseignantPermanent) {
    return this.http.post("http://localhost:8080/AjouterEnseignantPermanent", enseignantpermanent)
      .map(resp => resp.json())
  }

  updateEnseignantPermanent(enseignantpermanent: EnseignantPermanent) {
    return this.http.put("http://localhost:8080/ModifierEnseignantPermanent/" + enseignantpermanent.matricule, enseignantpermanent)
      .map(resp => resp.json())
  }

  deleteEnseignantPermanent(matricule: number) {
    return this.http.delete("http://localhost:8080/SupprimerEnseignantPermanent/" + matricule)
      .map(resp => resp.json())
  }
  getAllEnseignantPermanents() {
    return this.http.get("http://localhost:8080/EnseignantsPermanents")
      .map(resp => resp.json())
  }
  ImprimerEnseignantPermanent(idDep: number,type:string) {
    return this.http.get("http://localhost:8080/ListePersonnelDepartement?mc="+idDep+"&mp="+type)
      .map(resp => resp.json())
  }
  
}

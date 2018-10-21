import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Contrat } from '../model/model.Contrat';

@Injectable()
export class ContratServices {
  constructor(public http: Http) {
  }

  getContrats(motcle:string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherContrat?mc="+motcle+"&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getContratPersonnel(idPers:number) {
    return this.http.get("http://localhost:8080/chercherContratPersonnel?mc="+idPers)
      .map(resp => resp.json())
  }
  getContrat(idContrat: number) {
    return this.http.get("http://localhost:8080/Contrat/" + idContrat)
      .map(resp => resp.json())
  }

  saveContrat(contrat:Contrat) {
    return this.http.post("http://localhost:8080/AjouterContrat", contrat)
      .map(resp => resp.json())
  }

  updateContrat(contrat:Contrat) {
    return this.http.put("http://localhost:8080/ModifierContrat/" + contrat.idContrat, contrat)
      .map(resp => resp.json())
  }

  deleteContrat(idContrat: number) {
    return this.http.delete("http://localhost:8080/SupprimerContrat/" + idContrat)
      .map(resp => resp.json())
  }
  getAllContrat() {
    return this.http.get("http://localhost:8080/Contrats")
      .map(resp => resp.json())
  }
}

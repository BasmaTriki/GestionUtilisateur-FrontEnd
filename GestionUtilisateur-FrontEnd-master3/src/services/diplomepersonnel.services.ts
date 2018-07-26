import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {DiplomePersonnel} from "../model/model.diplomepersonnel";

@Injectable()
export class DiplomePersonnelServices {
  constructor(public http: Http) {
  }

  getDiplomePersonnels(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherDiplomePersonnel?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getDiplomePersonnel(idDipP: number) {
    return this.http.get("http://localhost:8080/DiplomePersonnel/" + idDipP)
      .map(resp => resp.json())
  }

  saveDiplomePersonnel(diplomepersonnel: DiplomePersonnel) {
    return this.http.post("http://localhost:8080/AjouterDiplomePersonnel", diplomepersonnel)
      .map(resp => resp.json())
  }

  updateDiplomePersonnel(diplomepersonnel: DiplomePersonnel) {
    return this.http.put("http://localhost:8080/ModifierDiplomePersonnel/" + diplomepersonnel.id_DipP, diplomepersonnel)
      .map(resp => resp.json())
  }

  deleteDiplomePersonnel(id_DipP: number) {
    return this.http.delete("http://localhost:8080/SupprimerDiplomePersonnel/" + id_DipP)
      .map(resp => resp.json())
  }
  getAllDiplomePersonnels() {
    return this.http.get("http://localhost:8080/DiplomePersonnels")
      .map(resp => resp.json())
  }
  
  getPersonnelDiplome(motCle:number) {
    return this.http.get("http://localhost:8080/chercherPersonnelDiplome?mc=" + motCle)
      .map(resp => resp.json())
  }
}

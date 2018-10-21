import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Administratif} from "../model/model.administratif";
@Injectable()
export class AdministratifServices {
  constructor(public http: Http) {
  }

  getAdministratifs(motcle:string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherAdministratif?mc="+motcle+"&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getAdministratifPernom(motcle1:string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherAdministratifPrenom?mp="+motcle1+"&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getAdministratifSansCompte() {
    return this.http.get("http://localhost:8080/chercherAdminSansCompte")
      .map(resp => resp.json())
  }
  getAdministratif(idPers: number) {
    return this.http.get("http://localhost:8080/Administratif/"+idPers)
      .map(resp => resp.json())
  }

  saveAdministratif(administratif: Administratif) {
    return this.http.post("http://localhost:8080/AjouterAdministratif", administratif)
      .map(resp => resp.json())
  }

  updateAdministratif(administratif: Administratif) {
    return this.http.put("http://localhost:8080/ModifierAdministratif/" + administratif.idPers, administratif)
      .map(resp => resp.json())
  }

  deleteAdministratif(idPers: number) {
    return this.http.delete("http://localhost:8080/SupprimerAdministratif/"+idPers)
      .map(resp => resp.json())
  }
  getAllAdministratifs() {
    return this.http.get("http://localhost:8080/Administratifs")
      .map(resp => resp.json())
  }
}

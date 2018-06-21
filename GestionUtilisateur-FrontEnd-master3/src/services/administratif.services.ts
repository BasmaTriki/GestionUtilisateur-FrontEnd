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

  getAdministratif(matricule: number) {
    return this.http.get("http://localhost:8080/Administratif/" +matricule)
      .map(resp => resp.json())
  }

  saveAdministratif(administratif: Administratif) {
    return this.http.post("http://localhost:8080/AjouterAdministratif", administratif)
      .map(resp => resp.json())
  }

  updateAdministratif(administratif: Administratif) {
    return this.http.put("http://localhost:8080/ModifierAdministratif/" + administratif.matricule, administratif)
      .map(resp => resp.json())
  }

  deleteAdministratif(matricule: number) {
    return this.http.delete("http://localhost:8080/SupprimerAdministratif/"+matricule)
      .map(resp => resp.json())
  }
  getAllAdministratifs() {
    return this.http.get("http://localhost:8080/Administratifs")
      .map(resp => resp.json())
  }
}
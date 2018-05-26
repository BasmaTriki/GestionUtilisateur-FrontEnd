import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PosteAdministrative} from "../model/model.posteAdministrative";

@Injectable()
export class PosteAdministrativeServices {
  constructor(public http: Http) {
  }

  getPostes(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherPosteAdministrative?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getPoste(id: number) {
    return this.http.get("http://localhost:8080/PosteAdministrative/" + id)
      .map(resp => resp.json())
  }

  savePoste(poste: PosteAdministrative) {
    return this.http.post("http://localhost:8080/AjouterPosteAdministrative", poste)
      .map(resp => resp.json())
  }

  updatePoste(poste: PosteAdministrative) {
    return this.http.put("http://localhost:8080/ModifierPosteAdministrative/"+ poste.id, poste)
      .map(resp => resp.json())
  }

  deletePoste(id: number) {
    return this.http.delete("http://localhost:8080/SupprimerPosteAdministrative/" + id)
      .map(resp => resp.json())
  }
  getAllPostes() {
    return this.http.get("http://localhost:8080/PosteAdministratives")
      .map(resp => resp.json())
  }
}

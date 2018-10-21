import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { EnseignantLibre } from '../model/model.enseignantLibre';

@Injectable()
export class EnseignantLibreServices {
  constructor(public http: Http) {
  }

  getEnseignantLibres(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantLibre?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getEnseignantLibre(idPers: number) {
    return this.http.get("http://localhost:8080/EnseignantLibre/" + idPers)
      .map(resp => resp.json())
  }

  saveEnseignantLibre(enseignantlibre: EnseignantLibre) {
    return this.http.post("http://localhost:8080/AjouterEnseignantLibre", enseignantlibre)
      .map(resp => resp.json())
  }

  updateEnseignantLibre(enseignantlibre: EnseignantLibre){
    return this.http.put("http://localhost:8080/ModifierEnseignantLibre/" + enseignantlibre.idPers, enseignantlibre)
      .map(resp => resp.json())
  }

  deleteEnseignantLibre(idPers: number) {
    return this.http.delete("http://localhost:8080/SupprimerEnseignantLibre/" + idPers)
      .map(resp => resp.json())
  }
  getAllEnseignantLibre() {
    return this.http.get("http://localhost:8080/EnseignantLibres")
      .map(resp => resp.json())
  }
  /*ImprimerEnseignantPermanent(idDep: number) {
    return this.http.get("http://localhost:8080/ListePersonnelDepartement?mc="+idDep)
      .map(resp => resp.json())
  }*/
  
}

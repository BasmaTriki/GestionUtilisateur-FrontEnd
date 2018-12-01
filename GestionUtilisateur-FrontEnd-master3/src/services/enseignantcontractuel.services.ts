import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {EnseignantContractuel} from "../model/model.enseignantContractuel";

@Injectable()
export class EnseignantContractuelServices {
  constructor(public http: Http) {
  }
  
  getEnseignantContractuels(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherEnseignantContractuel?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getEnseignantContractuel(idPers: number) {
    return this.http.get("http://localhost:8080/EnseignantContractuel/" + idPers)
      .map(resp => resp.json())
  }

  saveEnseignantContractuel(enseignantContractuel: EnseignantContractuel) {
    return this.http.post("http://localhost:8080/AjouterEnseignantContractuel", enseignantContractuel)
      .map(resp => resp.json())
  }

  updateEnseignantContractuel(enseignantContractuel: EnseignantContractuel) {
    return this.http.put("http://localhost:8080/ModifierEnseignantContractuel/" + enseignantContractuel.idPers, enseignantContractuel)
      .map(resp => resp.json())
  }

  deleteEnseignantContractuel(idPers: number) {
    return this.http.delete("http://localhost:8080/SupprimerEnseignantContractuel/" + idPers)
      .map(resp => resp.json())
  }
  getAllEnseignantContractuels() {
    return this.http.get("http://localhost:8080/EnseignantContractuels")
      .map(resp => resp.json())
  }
  
}

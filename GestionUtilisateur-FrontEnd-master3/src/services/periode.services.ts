import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Periode} from '../model/model.periode';

@Injectable()
export class PeriodeServices {
  constructor(public http: Http) {
  }

  getPeriodes(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherPeriode?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getPeriode(id_periode: number) {
    return this.http.get("http://localhost:8080/Periode/" + id_periode)
      .map(resp => resp.json())
  }

  savePeriode(periode: Periode) {
    return this.http.post("http://localhost:8080/AjouterPeriode", periode)
      .map(resp => resp.json())
  }

  updatePeriode(periode: Periode) {
    return this.http.put("http://localhost:8080/ModifierPeriode/"+ periode.id_periode, periode)
      .map(resp => resp.json())
  }

  deletePeriode(id_periode: number) {
    return this.http.delete("http://localhost:8080/SupprimerPeriode/" + id_periode)
      .map(resp => resp.json())
  }
  getAllPeriodes() {
    return this.http.get("http://localhost:8080/Periodes")
      .map(resp => resp.json())
  }
 
  getPeriodePersonnel(idPers:number) {
    return this.http.get("http://localhost:8080/chercherPeriodePersonnel?mc="+idPers)
      .map(resp => resp.json())
  }
}

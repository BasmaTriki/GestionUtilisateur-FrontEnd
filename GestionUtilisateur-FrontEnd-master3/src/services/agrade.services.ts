import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AGrade} from "../model/model.agrade";
import {Grade} from "../model/model.grade";

@Injectable()
export class AGradeServices {
  constructor(public http: Http) {
  }

  getAGrades(motcle:string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherAGrade?mc="+motcle+"&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }
  getAGradesPersonnel(motcle:number) {
    return this.http.get("http://localhost:8080/chercherPersonnelGrade?mc="+motcle)
      .map(resp => resp.json())
  }
  getAGrade(id_agrade: number) {
    return this.http.get("http://localhost:8080/AGrade/" + id_agrade)
      .map(resp => resp.json())
  }

  saveAGrade(agrade: AGrade) {
    return this.http.post("http://localhost:8080/AjouterAGrade", agrade)
      .map(resp => resp.json())
  }

  updateAGrade(agrade: AGrade) {
    return this.http.put("http://localhost:8080/ModifierAGrade/" + agrade.id_agrade, agrade)
      .map(resp => resp.json())
  }

  deleteAGrade(id: number) {
    return this.http.delete("http://localhost:8080/SupprimerAGrade/" + id)
      .map(resp => resp.json())
  }
  getAllAGrades() {
    return this.http.get("http://localhost:8080/AGrades")
      .map(resp => resp.json())
  }
}

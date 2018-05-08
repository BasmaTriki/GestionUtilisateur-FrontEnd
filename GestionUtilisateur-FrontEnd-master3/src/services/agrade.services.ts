import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AGrade} from "../model/model.agrade";

@Injectable()
export class AGradeServices {
  constructor(public http: Http) {
  }

  getAGrades(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherAGrade?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getAGrade(id_grade: number) {
    return this.http.get("http://localhost:8080/AGrade/" + id_grade)
      .map(resp => resp.json())
  }

  saveAGrade(agrade: AGrade) {
    return this.http.post("http://localhost:8080/AjouterAGrade", agrade)
      .map(resp => resp.json())
  }

  updateAGrade(agrade: AGrade) {
    return this.http.put("http://localhost:8080/ModifierAGrade/" + agrade.id_grade, agrade)
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

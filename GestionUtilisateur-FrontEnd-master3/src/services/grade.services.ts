import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Grade} from "../model/model.grade";

@Injectable()
export class GradeServices {
  constructor(public http: Http) {
  }

  getGrades(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherGrade?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getGrade(id: number) {
    return this.http.get("http://localhost:8080/Grade/" + id)
      .map(resp => resp.json())
  }

  saveGrade(grade: Grade) {
    return this.http.post("http://localhost:8080/AjouterGrade", grade)
      .map(resp => resp.json())
  }

  updateGrade(grade: Grade) {
    return this.http.put("http://localhost:8080/ModifierGrade/" + grade.id, grade)
      .map(resp => resp.json())
  }

  deleteGrade(id: number) {
    return this.http.delete("http://localhost:8080/SupprimerGrade/" + id)
      .map(resp => resp.json())
  }
  getAllGrades() {
    return this.http.get("http://localhost:8080/Grades")
      .map(resp => resp.json())
  }
}

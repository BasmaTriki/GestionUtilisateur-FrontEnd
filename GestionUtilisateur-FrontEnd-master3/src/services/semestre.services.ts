import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Semestre } from '../model/model.semestre';
@Injectable()
export class SemestreServices {
  constructor(public http:Http) {}

  getAnnees(desc:String,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherSemestre?mc="+desc+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getSemestre(idSem:number){
    return this.http.get("http://localhost:8080/Semestre/"+idSem)
      .map(resp=>resp.json())
  }
  saveSemestre(semestre:Semestre){
    return this.http.post("http://localhost:8080/AjouterSemestre",semestre)
      .map(resp=>resp.json())
  }
  updateSemestre(semestre:Semestre){
    return this.http.put("http://localhost:8080/ModifierSemestre/"+semestre.idSem,semestre)
      .map(resp=>resp.json())
  }
  deleteSemestre(idSem:number){
    return this.http.delete("http://localhost:8080/SupprimerSemestre/"+idSem)
      .map(resp=>resp.json())
  }
  getAllSemestre()
  {
    return this.http.get("http://localhost:8080/Semestres")
      .map(resp=>resp.json())
  }
}

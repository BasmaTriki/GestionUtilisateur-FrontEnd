import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Departement} from "../model/model.departement";

@Injectable()
export class DepartementServices{
  constructor(public http:Http) {
  }
  getDepartements(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherDepartement?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allDepartements(){
    return this.http.get("http://localhost:8080/Departements")
      .map(resp=>resp.json())
  }
  getDepartement(idDep:number){
    return this.http.get("http://localhost:8080/Departement/"+idDep)
      .map(resp=>resp.json())
  }
  saveDepartement(departement:Departement){
    return this.http.post("http://localhost:8080/AjouterDepartement",departement)
      .map(resp=>resp.json())
  }
  updateDepartement(departement:Departement){
    return this.http.put("http://localhost:8080/ModifierDepartement/"+departement.idDep,departement)
      .map(resp=>resp.json())
  }
  deleteDepartement(id:number){
    return this.http.delete("http://localhost:8080/SupprimerDepartement/"+id)
      .map(resp=>resp.json())
  }
  }

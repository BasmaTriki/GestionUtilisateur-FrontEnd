import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Specialite} from "../model/model.specialite";
@Injectable()
export class SpecialiteServices{
  constructor(public http:Http) {
  }
  getSpecialites(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherSpecialite?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allSpecialites(){
    return this.http.get("http://localhost:8080/Specialites")
      .map(resp=>resp.json())
  }
  getSpecialite(idSp:number){
    return this.http.get("http://localhost:8080/Specialite/"+idSp)
      .map(resp=>resp.json())
  }
  saveSpecialite(specialite:Specialite){
    return this.http.post("http://localhost:8080/AjouterSpecialite",specialite)
      .map(resp=>resp.json())
  }
  updateSpecialite(specialite:Specialite){
    return this.http.put("http://localhost:8080/ModifierSpecialite/"+specialite.idSp,specialite)
      .map(resp=>resp.json())
  }
  deleteSpecialite(idSp:number){
    return this.http.delete("http://localhost:8080/SupprimerSpecialite/"+idSp)
      .map(resp=>resp.json())
  }
}

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Conge} from '../model/model.conge';

@Injectable()
export class CongeServices{
  constructor(public http:Http) {

  }
  getConges(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherConges?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allConges(){
    return this.http.get("http://localhost:8080/conges")
      .map(resp=>resp.json())
  }
  getConge(idCong:number){
    return this.http.get("http://localhost:8080/conge/"+idCong)
      .map(resp=>resp.json())
  }
  saveConge(conge:Conge){
    return this.http.post("http://localhost:8080/AjouterConge",conge)
      .map(resp=>resp.json())
  }
  updateConge(conge:Conge){
    return this.http.put("http://localhost:8080/ModifierConge/"+conge.idCong,conge)
      .map(resp=>resp.json())
  }
  deleteConge(idCong:number){
    return this.http.delete("http://localhost:8080/SupprimerConge/"+idCong)
      .map(resp=>resp.json())
  }
  getCongesPersonnel(motCle:number,page:number,size:number)
  {
    return this.http.get("http://localhost:8080/chercherCongesP?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getNbJourParType(matricule:number,libelle:string,page:number,size:number)
  {
    return this.http.get("http://localhost:8080/chercherNbJourParType?mc="+matricule+"&mt="+libelle+"&page="+page+"&size="+size)
      .map(resp=>resp.json())
  }

}

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Etat } from '../model/model.etat';
@Injectable()
export class EtatServices {
  constructor(public http:Http) {}

  getEtats(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherEtat?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getEtat(idEtat:number){
    return this.http.get("http://localhost:8080/Etat/"+idEtat)
      .map(resp=>resp.json())
  }
  saveEtat(etat:Etat){
    return this.http.post("http://localhost:8080/AjouterEtat",etat)
      .map(resp=>resp.json())
  }
  updateEtat(etat:Etat){
    return this.http.put("http://localhost:8080/ModifierEtat/"+etat.idEtat,etat)
      .map(resp=>resp.json())
  }
  deleteEtat(idEtat:number){
    return this.http.delete("http://localhost:8080/SupprimerEtat/"+idEtat)
      .map(resp=>resp.json())
  }
  getAllEtats()
  {
    return this.http.get("http://localhost:8080/Etats")
      .map(resp=>resp.json())
  }
}

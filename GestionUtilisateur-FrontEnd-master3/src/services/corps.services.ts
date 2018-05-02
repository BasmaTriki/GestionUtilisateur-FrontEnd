import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Corps} from "../model/model.corps";
@Injectable()
export class CorpsServices{
  constructor(public http:Http) {
  }
  getCorpss(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherCorps?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allCorpss(){
    return this.http.get("http://localhost:8080/Corpss")
      .map(resp=>resp.json())
  }
  getCorps(idcps:number){
    return this.http.get("http://localhost:8080/Corps/"+idcps)
      .map(resp=>resp.json())
  }
  saveCorps(corps:Corps){
    return this.http.post("http://localhost:8080/AjouterCorps",corps)
      .map(resp=>resp.json())
  }
  updateCorps(corps:Corps){
    return this.http.put("http://localhost:8080/ModifierCorps/"+corps.idcps,corps)
      .map(resp=>resp.json())
  }
  deleteCorps(id:number){
    return this.http.delete("http://localhost:8080/SupprimerCorps/"+id)
      .map(resp=>resp.json())
  }
}

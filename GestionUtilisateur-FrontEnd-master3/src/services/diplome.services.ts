import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Diplome} from '../model/model.diplome';

@Injectable()
export class DiplomeServices{
  constructor(public http:Http) {

  }
  getDiplomes(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherDiplome?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allDiplomes(){
    return this.http.get("http://localhost:8080/Diplomes")
      .map(resp=>resp.json())
  }
  getDiplome(idDip:number){
    return this.http.get("http://localhost:8080/Diplome/"+idDip)
      .map(resp=>resp.json())
  }
  saveDiplome(diplome:Diplome){
    return this.http.post("http://localhost:8080/AjouterDiplome",diplome)
      .map(resp=>resp.json())
  }
  updateDiplome(diplome:Diplome){
    return this.http.put("http://localhost:8080/ModifierDiplome/"+diplome.idDip,diplome)
      .map(resp=>resp.json())
  }
  deleteDiplome(id:number){
    return this.http.delete("http://localhost:8080/SupprimerDiplome/"+id)
      .map(resp=>resp.json())
  }
}

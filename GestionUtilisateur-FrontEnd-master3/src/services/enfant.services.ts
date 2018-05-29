import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Enfant} from '../model/model.enfant';
@Injectable()
export class EnfantServices {
  constructor(public http:Http) {}

  getEnfants(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherEnfants?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getEnfant(num:number){
    return this.http.get("http://localhost:8080/enfants/"+num)
      .map(resp=>resp.json())
  }
  saveEnfant(enfant:Enfant){
    return this.http.post("http://localhost:8080/enfants",enfant)
      .map(resp=>resp.json())
  }
  updateEnfant(enfant:Enfant){
    return this.http.put("http://localhost:8080/enfants/"+enfant.num,enfant)
      .map(resp=>resp.json())
  }
  deleteEnfant(num:number){
    return this.http.delete("http://localhost:8080/enfants/"+num)
      .map(resp=>resp.json())
  }
  getAllEnfant()
  {
    return this.http.get("http://localhost:8080/Allenfants")
      .map(resp=>resp.json())
  }

}

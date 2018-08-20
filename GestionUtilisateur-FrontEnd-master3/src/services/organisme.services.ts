import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Organisme} from "../model/model.organisme";
@Injectable()
export class OrganismeServices{
  constructor(public http:Http) {
  }
  getOrganismeAccueils(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherOrganisme?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allOrganismeAccueils(){
    return this.http.get("http://localhost:8080/Organismes")
      .map(resp=>resp.json())
  }
  getOrganismeAccueil(idOrg:number){
    return this.http.get("http://localhost:8080/Organisme/"+idOrg)
      .map(resp=>resp.json())
  }
  saveOrganismeAccueil(organismeAccueil:Organisme){
    return this.http.post("http://localhost:8080/AjouterOrganisme",organismeAccueil)
      .map(resp=>resp.json())
  }
  updateOrganismeAccueil(organismeAccueil:Organisme){
    return this.http.put("http://localhost:8080/ModifierOrganisme/"+organismeAccueil.idOrg,organismeAccueil)
      .map(resp=>resp.json())
  }
  deleteOrganismeAccueil(idOrg:number){
    return this.http.delete("http://localhost:8080/SupprimerOrganisme/"+idOrg)
      .map(resp=>resp.json())
  }
}

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {OrganismeAccueil} from "../model/model.organismeAccueil";
@Injectable()
export class OrganismeAccueilServices{
  constructor(public http:Http) {
  }
  getOrganismeAccueils(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherOrganismeAccueil?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allOrganismeAccueils(){
    return this.http.get("http://localhost:8080/OrganismeAccueils")
      .map(resp=>resp.json())
  }
  getOrganismeAccueil(idOrg:number){
    return this.http.get("http://localhost:8080/OrganismeAccueil/"+idOrg)
      .map(resp=>resp.json())
  }
  saveOrganismeAccueil(organismeAccueil:OrganismeAccueil){
    return this.http.post("http://localhost:8080/AjouterOrganismeAccueil",organismeAccueil)
      .map(resp=>resp.json())
  }
  updateOrganismeAccueil(organismeAccueil:OrganismeAccueil){
    return this.http.put("http://localhost:8080/ModifierOrganismeAccueil/"+organismeAccueil.idOrg,organismeAccueil)
      .map(resp=>resp.json())
  }
  deleteOrganismeAccueil(idOrg:number){
    return this.http.delete("http://localhost:8080/SupprimerOrganismeAccueil/"+idOrg)
      .map(resp=>resp.json())
  }
}

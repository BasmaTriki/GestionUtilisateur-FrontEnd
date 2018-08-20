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
  
  getValideConges(valide:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherValideConge?mc="+valide+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allConges(){
    return this.http.get("http://localhost:8080/conges")
      .map(resp=>resp.json())
  }
  
  Imprimer(mois:number,annee:number){
    return this.http.get("http://localhost:8080/ListeCongeParMois?mc="+mois+"&mp="+annee)
      .map(resp=>resp.json())
  }
  
  ImprimerCongePersonnel(idPers:number){
    return this.http.get("http://localhost:8080/ListeCongeParPersonnel?mc="+idPers)
      .map(resp=>resp.json())
  }
  
  ImprimerCongeType(mois:number,annee:number,idtype:number){
    return this.http.get("http://localhost:8080/ListeCongeParType?mc="+mois+"&mp="+annee+"&mt="+idtype)
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
  getCongesPersonnel(idPers:number,page:number,size:number)
  {
    return this.http.get("http://localhost:8080/chercherCongesP?mc="+idPers+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getNbJourParType(idPers:number,idCg:number)
  {
    return this.http.get("http://localhost:8080/chercherNbJourParType?mc="+idPers+"&mt="+idCg)
      .map(resp=>resp.json());
  }
  getCongesAutoriser(motCle:boolean,motcle1:string,page:number,size:number)
  {
    return this.http.get("http://localhost:8080/chercherCongeAutoriser?mc="+motCle+"&mp="+motcle1+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  
}

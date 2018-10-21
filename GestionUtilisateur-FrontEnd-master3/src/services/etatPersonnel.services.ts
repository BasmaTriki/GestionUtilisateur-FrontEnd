import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { EtatPersonnel } from '../model/model.etatPersonnel';
@Injectable()
export class EtatPersonnelServices {
  constructor(public http:Http) {}

  getEtatPersonnels(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherEtatPersonnel?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getEtatInactive(idPers:number,idEtat:number){
    return this.http.get("http://localhost:8080/chercherEtatInactive?mc="+idPers+"&mp="+idEtat)
      .map(resp=>resp.json())
  }
  getEtatPersonnel(idEtatP:number){
    return this.http.get("http://localhost:8080/EtatPersonnel/"+idEtatP)
      .map(resp=>resp.json())
  }
  saveEtatPersonnel(etatPersonnel:EtatPersonnel){
    return this.http.post("http://localhost:8080/AjouterEtatPersonnel",etatPersonnel)
      .map(resp=>resp.json())
  }
  updateEtatPersonnel(etatPersonnel:EtatPersonnel){
    return this.http.put("http://localhost:8080/ModifierEtatPersonnel/"+etatPersonnel.idEtatP,etatPersonnel)
      .map(resp=>resp.json())
  }
  deleteEtatPersonnel(idEtatP:number){
    return this.http.delete("http://localhost:8080/SupprimerEtatPersonnel/"+idEtatP)
      .map(resp=>resp.json())
  }
  getAllEtatPersonnels()
  {
    return this.http.get("http://localhost:8080/EtatPersonnels")
      .map(resp=>resp.json())
  }
}

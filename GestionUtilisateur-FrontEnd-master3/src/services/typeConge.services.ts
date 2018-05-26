import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TypeConge} from '../model/model.typeConge';

@Injectable()
export class TypeCongeServices{
  constructor(public http:Http) {

  }
  getTypeConges(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherTypeConge?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allTypesConges(){
    return this.http.get("http://localhost:8080/TypeConges")
      .map(resp=>resp.json())
  }
  getTypeConge(idCg:number){
    return this.http.get("http://localhost:8080/TypeConge/"+idCg)
      .map(resp=>resp.json())
  }
  saveTypeConge(typeConge:TypeConge){
    return this.http.post("http://localhost:8080/AjouterTypeConge",typeConge)
      .map(resp=>resp.json())
  }
  updateTypeConge(typeConge:TypeConge){
    return this.http.put("http://localhost:8080/ModifierTypeConge/"+typeConge.idCg,typeConge)
      .map(resp=>resp.json())
  }
  deleteTypeConge(idCg:number){
    return this.http.delete("http://localhost:8080/SupprimerTypeConge/"+idCg)
      .map(resp=>resp.json())
  }
}

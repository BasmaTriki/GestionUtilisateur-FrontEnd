import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TypeMutation} from '../model/model.typeMutation';

@Injectable()
export class TypeMutationsServices{
  constructor(public http:Http) {

  }
  getTypeMutations(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherTypeMutation?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allTypesMutations(){
    return this.http.get("http://localhost:8080/TypeMutations")
      .map(resp=>resp.json())
  }
  getTypeMutation(code:number){
    return this.http.get("http://localhost:8080/TypeMutation/"+code)
      .map(resp=>resp.json())
  }
  saveTypeMutation(typeMutation:TypeMutation){
    return this.http.post("http://localhost:8080/AjouterTypeMutation",typeMutation)
      .map(resp=>resp.json())
  }
  updateTypeMutation(typeMutation:TypeMutation){
    return this.http.put("http://localhost:8080/ModifierTypeMutation/"+typeMutation.code,typeMutation)
      .map(resp=>resp.json())
  }
  deleteTypeMutation(code:number){
    return this.http.delete("http://localhost:8080/SupprimerTypeMutation/"+code)
      .map(resp=>resp.json())
  }
}

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Role} from "../model/model.role";
@Injectable()
export class RoleServices{
  constructor(public http:Http) {
  }
  getRoles(motCle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherRole?mc="+motCle+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  allRoles(){
    return this.http.get("http://localhost:8080/Roles")
      .map(resp=>resp.json())
  }
  getRole(idRole:number){
    return this.http.get("http://localhost:8080/Role/"+idRole)
      .map(resp=>resp.json())
  }
  saveRole(role:Role){
    return this.http.post("http://localhost:8080/AjouterRole",role)
      .map(resp=>resp.json())
  }
  updateRole(role:Role){
    return this.http.put("http://localhost:8080/ModifierRole/"+role.idRole,role)
      .map(resp=>resp.json())
  }
  deleteRole(idRole:number){
    return this.http.delete("http://localhost:8080/SupprimerRole/"+idRole)
      .map(resp=>resp.json())
  }
}

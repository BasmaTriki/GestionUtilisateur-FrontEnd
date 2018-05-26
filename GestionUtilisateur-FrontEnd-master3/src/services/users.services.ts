import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../model/model.user';

@Injectable()
export class UsersServices{
constructor(public http:Http) {

}
getUsers(motCle:string,page:number,size:number){
return this.http.get("http://localhost:8080/chercherUsers?mc="+motCle+"&size="+size+"&page="+page)
  .map(resp=>resp.json())
}
  getUser(login:string){
    return this.http.get("http://localhost:8080/users/"+login)
      .map(resp=>resp.json())
  }
saveUser(user:User){
    return this.http.post("http://localhost:8080/AjouterUsers",user)
      .map(resp=>resp.json())
  }
updateUser(user:User){
    return this.http.put("http://localhost:8080/ModifierUsers/"+user.login,user)
      .map(resp=>resp.json())
  }
deleteUser(login:string){
    return this.http.delete("http://localhost:8080/SupprimerUsers/"+login)
      .map(resp=>resp.json())
  }
  getAllUser()
  {
    return this.http.get("http://localhost:8080/users")
      .map(resp=>resp.json())
  }
  getAllPersonnel()
  {
    return this.http.get("http://localhost:8080/Personnels")
      .map(resp=>resp.json())
  }
}

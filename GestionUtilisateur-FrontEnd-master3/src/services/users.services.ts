import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../model/model.user';

@Injectable()
export class UsersServices{
constructor(public http:Http) {

}
getUsers(login:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherUsers?mc="+login+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }

getUsersLogin(login:string,motpass:string,page:number,size:number){
return this.http.get("http://localhost:8080/chercherUsersLogin?mc="+login+"&mp="+motpass+"&size="+size+"&page="+page)
  .map(resp=>resp.json())
}
  getUser(idUser:number){
    return this.http.get("http://localhost:8080/user/"+idUser)
      .map(resp=>resp.json())
  }
saveUser(user:User){
    return this.http.post("http://localhost:8080/AjouterUsers",user)
      .map(resp=>resp.json())
  }
updateUser(user:User){
    return this.http.put("http://localhost:8080/ModifierUsers/"+user.idUser,user)
      .map(resp=>resp.json())
  }
deleteUser(idUser:number){
    return this.http.delete("http://localhost:8080/SupprimerUsers/"+idUser)
      .map(resp=>resp.json())
  }
  getAllUser()
  {
    return this.http.get("http://localhost:8080/users")
      .map(resp=>resp.json())
  }
}

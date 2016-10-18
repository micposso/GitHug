import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService{
  private username: string;
  private client_id = 'fed417be4fb9ea0af51d';
  private client_secret = 'e1d228d9dc05c6caf51038443e648afe8782a13e';
  
  constructor(private _http: Http){
    console.log('GitHub service ready.....');
    this.username = 'micposso';
  }
  
  getUser(){
    return this._http.get('http://api.github.com/users/'+this.username+'?client_id='+this.client_id+'&client_secret='+this.client_secret)
      .map(res => res.json());
  }

  getRepos(){
    return this._http.get('http://api.github.com/users/'+this.username+'/repos?client_id='+this.client_id+'&client_secret='+this.client_secret)
      .map(res => res.json());
  }
  
  updateUser(username:string){
    this.username = username;
  }
  
}//end class GithubService


import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService{
  private username: string;
  private location: string;
  public  locationUsers: Array<any> = [];
  private getUsersFlag: boolean = false;
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

  getUserByLoginName(userLoginName: string){
    return this._http.get('http://api.github.com/users/'+userLoginName+'?client_id='+this.client_id+'&client_secret='+this.client_secret)
      .map(res => res.json());
  }

  getLocationUsers(){
    return this._http.get('http://api.github.com/search/users?type=Users&q=location:' + this.location + '&client_id='+this.client_id+'&client_secret='+this.client_secret)
      .map(res => res.json());
  }

  getViewUsers() {
    this.getLocationUsers()
      .subscribe(
        users => {
          this.getUsersFlag = false;
          let tempLocationUsers = users.items;

          this.locationUsers = [];

          for (let index = 0; index < tempLocationUsers.length; index ++ ){

              if ( tempLocationUsers[index].login ) {
                this.getUserByLoginName(tempLocationUsers[index].login)
                  .subscribe(
                    userinfo => {
                      if( this.locationUsers.length < 5 ){
                        this.locationUsers.push(userinfo);
                        console.log(this.locationUsers);
                        //console.log(this.locationUsers);
                      } else {
                        this.getUsersFlag = true;
                      }
                    });
              }

              if (this.getUsersFlag){
                break;
              }
          }
      });
  }

  updateUser(username:string){
    this.username = username;
  }

  updateLocationUser(userLocation:string){
    this.location = userLocation;

  }

  getLocationUsersData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.locationUsers);
      }, 2000);
    });
  }

}//end class GithubService

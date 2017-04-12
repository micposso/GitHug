import { Component } from '@angular/core';
import { GithubService } from '../services/github.service';
import Array = core.Array;

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {

  user: any;
  username: string;
  location: string;
  locationUsers: Array<any> = [];

  constructor( private _githubService: GithubService ){
    this.user = false;

  }

  searchUser() {
    this._githubService.updateUser(this.username);

    this._githubService.getUser().subscribe(user => {

      this.user = user;
      this.location = user.location;

      this._githubService.updateLocationUser(this.location);

      this._githubService.getViewUsers();
      this._loadLocationUsersData();

    });
  }

  private _loadLocationUsersData() {
    this._githubService.getLocationUsersData().then((data) => {

      this.locationUsers = data;

    });
  }

}

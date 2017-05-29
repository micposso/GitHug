import { Component,
				trigger,
				state,
				style,
				transition,
				animate,
				keyframes
} from '@angular/core';
import { GithubService } from '../services/github.service';
import Array = core.Array;

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
			animations: [

			trigger('movePanel', [

			transition('void => *', [
			style({backgroundColor: '#000000'}), animate(100)
				])
			])

		]
})

export class ProfileComponent {

	state: string = 'inactive';

  user: any;
  username: string;
  location: string;
  locationUsers: Array<any> = [];
  locationChecked: boolean = false;
  hireableChecked: boolean = false;

  constructor( private _githubService: GithubService ){
    this.user = false;

  }

  searchUser() {
    if((!this.locationChecked || !this.hireableChecked) || !this.username) {
      alert("Must tick location/hireable and enter username");
      return;
    }
    this._githubService.updateUser(this.username);

    this._githubService.getUser().subscribe(user => {

      this.user = user;
      this.location = user.location;

      this._githubService.updateLocationUser(this.location, this.hireableChecked);

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

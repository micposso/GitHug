import { Component } from '@angular/core';
import {GithubService} from './services/github.service';

@Component({
    selector: 'my-app',
    template: `<div class="container"><profile></profile></div>`,
    providers: [GithubService]
})

export class AppComponent { }

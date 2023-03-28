import { Component } from '@angular/core';
import { GitHubService } from '../git-hub.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(private github: GitHubService) { }

  getUserInfo(username: string): void {
    this.github.getUserInfo(username);
  }
}

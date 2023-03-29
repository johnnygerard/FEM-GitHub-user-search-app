import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitHubService } from '../git-hub.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  protected userNotFound = false;

  constructor(private github: GitHubService) { }

  protected getUserInfo(username: string): void {
    this.github.getUserInfo(username);
  }

  ngOnInit(): void {
    this.github.userNotFound$.subscribe(userNotFound => this.userNotFound = userNotFound);
  }

  ngOnDestroy(): void {
    this.github.userNotFound$.unsubscribe();
  }
}

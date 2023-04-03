import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GitHubService } from '../git-hub.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  protected userNotFound = false;
  protected readonly inputLabel = 'Search GitHub username…';

  constructor(private github: GitHubService) { }

  protected getUserInfo(username: string, form: NgForm): void {
    this.github.getUserInfo(username, form);
  }

  ngOnInit(): void {
    this.github.userNotFound$.subscribe(userNotFound => this.userNotFound = userNotFound);
  }

  ngOnDestroy(): void {
    this.github.userNotFound$.unsubscribe();
  }
}

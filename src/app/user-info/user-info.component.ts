import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitHubService } from '../git-hub.service';
import type { UserInfo } from '../UserInfo';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  protected userInfo: UserInfo = {
    avatar_url: '',
    name: null,
    login: '',
    created_at: '',
    bio: null,
    public_repos: 0,
    followers: 0,
    following: 0,
    location: null,
    blog: null,
    twitter_username: null,
    company: null,
  };

  // Opacity is set to 0 when loading is true except for the background
  protected loading = true;

  constructor(private github: GitHubService) { }

  // Retrieve user info
  ngOnInit(): void {
    this.github.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
      this.loading = false;
    });
    this.github.getUserInfo('octocat');
  }

  ngOnDestroy(): void {
    this.github.userInfo$.unsubscribe();
  }

  // Replace each @mention with a GitHub link
  protected linkify(text: string): string {
    const sanitized = this.escape(text);

    // GitHub username rules:
    // - may only contain alphanumeric characters or hyphens
    // - hyphens are surrounded by alphanumeric characters
    // - length is between 1 and 39 characters
    // - case insensitive
    return sanitized.replaceAll(/@(?!-)(([a-z\d]|-(?!-)){1,39})(?<!-)(?![a-z\d-])/gi,
      '<a href="https://github.com/$1" target="_blank">@$1</a>');
  }

  // Escape HTML special characters using decimal numeric character references
  private escape(html: string): string {
    return html.replaceAll(/&|<|>|"|'/g, match => `&#${match.charCodeAt(0)};`);
  }
}

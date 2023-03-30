import { Component, OnInit } from '@angular/core';
import { GitHubService } from '../git-hub.service';
import type { UserInfo } from '../UserInfo';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  // Set default user in case GitHub servers are unavailable
  protected userInfo: UserInfo = {
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    name: "The Octocat",
    login: "octocat",
    created_at: "2011-01-25T18:44:36Z",
    bio: null,
    public_repos: 8,
    followers: 8741,
    following: 9,
    location: "San Francisco!!",
    blog: "https://github.blog",
    twitter_username: null,
    company: "@github",
  };

  constructor(private github: GitHubService) { }

  // Retrieve user info
  ngOnInit(): void {
    this.github.userInfo$.subscribe(userInfo => this.userInfo = userInfo);
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

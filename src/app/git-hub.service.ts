import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, retry, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  readonly userInfoSubject = new Subject<Object>();
  private loading = false;

  constructor(private client: HttpClient) { }

  // Send GET request to fetch user info from GitHub REST API
  getUserInfo(username: string): void {
    // Prevent concurrent requests
    if (this.loading) return;
    this.loading = true;

    this.client
      .get(`https://api.github.com/users/${this.sanitize(username)}`, {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      }).pipe(
        // Only retry status 0 errors (network errors)
        retry({
          count: 3,
          delay: (error: HttpErrorResponse, retryCount) => {
            if (error.status) return throwError(() => error); // Forward HTTP errors
            return new Observable(subscriber => {
              // Retry request after increasing delay (10, 100, 1000 ms)
              setTimeout(() => subscriber.next(true), 10 ** retryCount);
            });
          },
        }),
        finalize(() => this.loading = false),
      ).subscribe({
        next: json => this.userInfoSubject.next(json),
        error: (error: HttpErrorResponse) => {
          // Log error and notify user
          console.error(error);
          alert('Failed to retrieve user info. Please try again later.');
        },
      });
  }

  private sanitize(username: string): string {
    return username ? encodeURIComponent(username) : 'octocat';
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize, Observable, retry, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  readonly userInfo$ = new Subject<Object>();
  readonly userNotFound$ = new Subject<boolean>();
  private loading = false;

  constructor(private client: HttpClient) { }

  // Send GET request to fetch user info from GitHub REST API
  getUserInfo(username: string, form: NgForm): void {
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
              setTimeout(() => subscriber.next(), 10 ** retryCount);
            });
          },
        }),
        finalize(() => this.loading = false),
      ).subscribe({
        next: userInfo => {
          this.userInfo$.next(userInfo);
          this.userNotFound$.next(false);
          form.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          // Notify search bar component that user was not found
          if (error.status === 404) {
            this.userNotFound$.next(true);
            return;
          }
          // Log error and notify user
          console.error(error);
          alert('Unable to retrieve user info.\nPlease try again later.');
        },
      });
  }

  private sanitize(username: string): string {
    return username ? encodeURIComponent(username) : 'octocat';
  }
}

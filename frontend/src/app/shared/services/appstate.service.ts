import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AppStateService {

  private selectedUserIdForReviews: number;
  private selectedUsernameForReviews: string;

  constructor(private http: HttpClient) {
  }

  getUsernameForReviews() {
    return this.selectedUsernameForReviews;
  }

  getUserIdForReviews() {
    return this.selectedUserIdForReviews;
  }

  setUsernameForReviews(username: string) {
    this.selectedUsernameForReviews = username;
  }

  setUserIdForReviews(userId: number) {
    this.selectedUserIdForReviews = userId;
  }

}


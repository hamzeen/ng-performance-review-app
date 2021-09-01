import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public static API_BASE_PATH = 'http://localhost:4201/api/v1';
  private headers = new Headers({'Content-Type': 'application/json'});
  private username: string;
  private userId: number;

  constructor(private http: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  /**
   * Call this and navigate to Login when the user wants to logout
   */
  removeToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    // use this to run locally w/out login apis
    /*if (!token) token = this.getToken();
    if (!token) return true;
    return false;*/

    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  setSessionUserId(id: number) {
    this.userId = id;
  }

  getSessionUserId() {
    return this.userId;
  }

  /**
   * this should return a JWT token
   * upon username and secret is correct
   */
  login(email:string, password:string) {
    return this.http
      .post<any>(`${AuthService.API_BASE_PATH}/login`, {name: email, password: password});
  }
}


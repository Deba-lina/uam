import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    return this.http.post(
      `${environment.apiUrl}/signup`,
      { email, password }
    );
  }

  logIn(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/signin`,
      { email, password }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {

    return (
      !!this.getToken() &&
      !this.isTokenExpired()
    );

  }
  getUsers(page: number, limit: number, sort: string = 'firstName', order: string = 'asc') {
    const token =
      localStorage.getItem('token');

    return this.http.get(
      `http://localhost:3000/api/users?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  }

  createUser(userData: any) {
    return this.http.post(
      'http://localhost:3000/api/users',
      userData
    );
  }

  updateUser(id: string, userData: any) {
    return this.http.put(
      `http://localhost:3000/api/users/${id}`,
      userData
    );
  }

  deleteUser(id: string) {
    return this.http.delete(
      `http://localhost:3000/api/users/${id}`
    );
  }

  isTokenExpired(): boolean {

    const token = this.getToken();

    if (!token) {
      return true;
    }

    try {

      const decoded: any =
        jwtDecode(token);

      const currentTime =
        Date.now() / 1000;

      return decoded.exp < currentTime;

    } catch {

      return true;

    }

  }

  autoLogout() {

    const token = this.getToken();

    if (!token) {
      return;
    }

    const decoded: any =
      jwtDecode(token);

    const expiryTime =
      decoded.exp * 1000;

    const timeout =
      expiryTime - Date.now();

    if (timeout <= 0) {

      this.logout();

      return;

    }

    setTimeout(() => {

      alert(
        'Session expired. Please login again.'
      );

      this.logout();

    }, timeout);

  }
}
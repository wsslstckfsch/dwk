import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';
import { IUserAddress } from '../shared/models/userAddress';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: string): Observable<void> {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/account`, { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: any): Observable<void> {
    return this.http.post(`${this.baseUrl}/account/login`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any): Observable<void> {
    return this.http.post(`${this.baseUrl}/account/register`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/shop');
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/account/email-exists?email=${email}`
    );
  }

  getUserShippingAddress(): Observable<IUserAddress> {
    return this.http.get<IUserAddress>(
      `${this.baseUrl}/account/shipping-address`
    );
  }

  updateUserShippingAddress(address: IUserAddress): Observable<IUserAddress> {
    return this.http.put<IUserAddress>(
      `${this.baseUrl}/account/shipping-address`,
      address
    );
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';
import { IUserShippingAddress } from '../shared/models/userShippingAddress';
import { IUserBillingAddress } from '../shared/models/userBillingAddress';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

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
    const currentLang = this.sharedService.checkLang();
    this.router.navigateByUrl('/' + currentLang + '/shop');
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/account/email-exists?email=${email}`
    );
  }

  getUserShippingAddress(): Observable<IUserShippingAddress> {
    return this.http.get<IUserShippingAddress>(
      `${this.baseUrl}/account/shipping-address`
    );
  }

  getUserBillingAddress(): Observable<IUserBillingAddress> {
    return this.http.get<IUserBillingAddress>(
      `${this.baseUrl}/account/billing-address`
    );
  }

  updateUserShippingAddress(
    address: IUserShippingAddress
  ): Observable<IUserShippingAddress> {
    return this.http.put<IUserShippingAddress>(
      `${this.baseUrl}/account/shipping-address`,
      address
    );
  }

  updateUserBillingAddress(
    address: IUserBillingAddress
  ): Observable<IUserBillingAddress> {
    return this.http.put<IUserBillingAddress>(
      `${this.baseUrl}/account/billing-address`,
      address
    );
  }
}

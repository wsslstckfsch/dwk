import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';
import { SharedService } from '../../shared/shared.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<IUser>;
  onB2bPage: boolean;
  currentLang: string;

  constructor(
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentLang = this.sharedService.checkLang();
        this.onB2bPage = this.sharedService.onB2bPage();
      });
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  changeLang(newLang: string): void {
    this.sharedService.changeLang(newLang);
  }

  logout(): void {
    this.accountService.logout();
  }
}

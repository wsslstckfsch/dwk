import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  langs = ['de', 'en', 'es', 'ru', 'jp'];
  currentLang: string;
  private currentLangSource = new BehaviorSubject<string>(null);
  currentLang$ = this.currentLangSource.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  checkLang(): string {
    const urlArray = this.router.url.split('/');
    urlArray.shift();
    return urlArray[0];
  }

  handleInitialLangRedirect(): void {
    const urlArray = this.router.url.split('/');
    urlArray.shift();
    const firstItem = urlArray[0];
    if (this.langs.includes(firstItem)) {
      this.currentLang = firstItem;
    } else {
      let browserLang = navigator.language;
      if (browserLang.indexOf('-') > -1) {
        browserLang = browserLang.split('-')[0];
      }
      let newLang = 'en';
      if (this.langs.includes(browserLang)) {
        newLang = browserLang;
      }
      this.currentLang = newLang;
      urlArray.unshift(newLang);
      const newUrl = urlArray.join('/');
      this.router.navigateByUrl(newUrl);
    }
  }

  changeLang(newLang: string): void {
    const urlArray = this.router.url.split('/');
    urlArray.shift();
    urlArray.shift();
    urlArray.unshift(newLang);
    const newUrl = urlArray.join('/');
    this.router.navigateByUrl(newUrl);
  }

  onB2bPage(): boolean {
    const path = this.router.url;
    return path.includes('/wdv');
  }
}

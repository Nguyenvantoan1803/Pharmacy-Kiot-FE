import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { INavData } from '@coreui/angular';
import { ChangeDetectorRef } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { CoreTranslationService } from '../@core/services/translation.service';
import { CoreMenuService } from '../@core/services/core-menu.service';
import { navItems } from '../assets/menu/menu';
import { locale as menuVietnamese } from '../assets/menu/language/i18n/vi'; 
import { locale as menuEnglish } from '../assets/menu/language/i18n/en'; 
//import { SidebarComponent } from '../app/layout/sidebar/sidebar.component';
import { LanguageService } from '../@core/services/language.service'; 

@Component({
  selector: 'app-root',
  template: `<router-outlet/>`,
  imports: [RouterOutlet, TranslateModule],
  providers: [TranslateService],
})
export class AppComponent implements OnInit {
  title = 'Pharmacy-Kiot';
  menuItems: any;
  languageInitialized: boolean = false;

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor(
    private _translate: TranslateService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private _coreTranslationService: CoreTranslationService,
    private _coreMenuService: CoreMenuService,
    private languageService: LanguageService
  ) {
    this.menuItems = navItems;
    _translate.setDefaultLang('vi');
    _translate.use('vi');
    //this._coreMenuService.setCurrentMenu('main');
    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set(
      'coreui-free-angular-admin-template-theme-default'
    );
    this.#colorModeService.eventName.set('ColorSchemeChange');
    this._translate.addLangs(['vi', 'en']);
    let languageLocal = localStorage.getItem('language') || 'vi'; // Check if language exists in localStorage
    console.log(languageLocal, 'languageLocal value');

    this._translate.setDefaultLang(languageLocal);
    if (languageLocal === this._translate.currentLang && !this.languageInitialized) {
      this.languageInitialized = true;
      this._coreTranslationService.translate(menuEnglish, menuVietnamese);
      this._translate.setDefaultLang(languageLocal); 
      this._translate.use(languageLocal).subscribe(() => {
        const translatedMenu = this.translateMenuItems(navItems);
        this._coreMenuService.register('main', translatedMenu);
        this._coreMenuService.setCurrentMenu('main');
      });
    }
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(language => {
      this._coreTranslationService.translate(menuEnglish, menuVietnamese);
      this._translate.use(language).subscribe(() => {
        const translatedMenu = this.translateMenuItems(navItems);
        this._coreMenuService.register('main', translatedMenu);
        this._coreMenuService.setCurrentMenu('main');
      });
    });
  
    this.#router.events
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
      });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map((params) => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter((theme) => ['dark', 'light', 'auto'].includes(theme)),
        tap((theme) => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
      
  }
  private translateMenuItems(menuItems: INavData[]): INavData[] {
    const translated =  menuItems.map(item => {
      const translatedItem: INavData = {
        ...item,
        name: this._translate.instant(item.translate || '')
      };
      console.log(translatedItem)
      if (item.children && item.children.length) {
        translatedItem.children = this.translateMenuItems(item.children);
      }
      return translatedItem;
    });
    return translated;
  }
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

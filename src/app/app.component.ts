import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { INavData } from '@coreui/angular';
import { ChangeDetectorRef } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { navItems } from '../assets/menu/menu'; 
@Component({
    selector: 'app-root',
    template: '<router-outlet />',
    imports: [RouterOutlet, TranslateModule],
    providers: [TranslateService]
})
export class AppComponent implements OnInit {
  title = 'Pharmacy-Kiot';
  menuItems: INavData[] = [];
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor(private translate: TranslateService,private http: HttpClient, private cdr: ChangeDetectorRef ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi'); // ngôn ngữ mặc định
    translate.use('vi'); // hoặc 'en' nếu bạn muốn tiếng Anh

    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }
 

  ngOnInit(): void {
    this.loadMenu();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadMenu(); // khi đổi ngôn ngữ → load lại menu và dịch
    });
    this.#router.events.pipe(
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
  // async loadMenu() {
  //   this.menuItems = navItems;
  //   for (const item of this.menuItems) {
  //     await this.translateMenuItem(item);
  //   }
  // }
  loadMenu() {
    const lang = 'vi'; // Ngôn ngữ là vi (Vietnamese)
    this.http.get<Record<string, string>>(`assets/menu/language/i18n/${lang}.json`)
      .subscribe({
        next: async (data) => {
          if (data && typeof data === 'object') {
            // Chuyển object thành mảng INavData[]
            this.menuItems = Object.keys(data).map(key => ({
              name: data[key], // Tên hiển thị
              translate: key,   // Từ khóa dịch
            }));

            // Dịch menu sau khi chuyển đổi
            for (const item of this.menuItems) {
              await this.translateMenuItem(item);
            }
          } else {
            console.error('Dữ liệu menu không hợp lệ:', data);
          }
        },
        error: (error) => {
          console.error('Lỗi khi tải menu:', error);
        }
      });
  }

  
  async translateMenuItem(item: INavData): Promise<void> {
    console.log(item, '67676767');
    if (item.translate) {
      item.name = await firstValueFrom(this.translate.get(item.translate)); // Dịch bằng ngx-translate
    }
  }
  
  
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
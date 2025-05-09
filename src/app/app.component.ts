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
  loadMenu() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    console.log(lang, 'langlang');
    
    this.http.get<any>(`assets/menu/language/${lang}.json`)
      .subscribe({
        next: (data) => {
          // Kiểm tra xem dữ liệu có phải là đối tượng không
          if (data && typeof data === 'object') {
            // Chuyển đối tượng thành mảng (lấy giá trị từ các khóa của đối tượng)
            this.menuItems = Object.values(data);
            
            // Dịch từng item trong menu
            this.menuItems.forEach(async item => {
              await this.translateMenuItem(item);
            });
            
            console.log('Menu loaded:', this.menuItems); // Kiểm tra thử
          } else {
            console.error('Dữ liệu không phải là đối tượng hợp lệ:', data);
          }
        },
        error: (error) => {
          console.error('Lỗi khi tải menu:', error);
        }
      });
  }
  
  async translateMenuItem(item: INavData) {
    if (item.translate) {
      // Dịch tên menu nếu có khóa dịch
      item.name = await firstValueFrom(this.translate.get(item.translate));
    }
    if (Array.isArray(item.children)) {
      for (const child of item.children) {
        if (child.translate) {
          // Dịch tên mục con nếu có khóa dịch
          child.name = await firstValueFrom(this.translate.get(child.translate));
        }
      }
    }
  }
  
  
  
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
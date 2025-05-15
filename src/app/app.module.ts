import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/menu/language/', '.json');
}
const appRoutes: Routes = [
  {
    path: "standard",
    loadChildren: () =>
      import("../components/standard/standard.module").then(
        (m) => m.StandardModule
      ),
  },
]
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    //TranslateModule.forRoot()
    TranslateModule.forRoot({
      loader: {
       provide: TranslateLoader,
       useFactory: HttpLoaderFactory,
       deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled", 
      useHash: false 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { } 
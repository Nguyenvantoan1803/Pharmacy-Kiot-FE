// standard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardInfomationModule } from './standard-infomation/standardinfomation.module'; // Đường dẫn đến module StandardInfomationModule
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadChildren: () =>
          import("./standard-infomation/standardinfomation.module").then((m) => m.StandardInfomationModule),
      },

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
  ],
  exports: [
  ]
})
export class StandardModule {}

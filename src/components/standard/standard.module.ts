// standard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardInfomationModule } from './standard-infomation/standardinfomation.module'; // Đường dẫn đến module StandardInfomationModule
import { Routes, RouterModule } from "@angular/router";
const routes: Routes = [
    {
        path: "standard",
        loadChildren: () =>
          import("./standard-infomation/standardinfomation.module").then((m) => m.StandardInfomationModule),
      },

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    StandardInfomationModule  // Import StandardInfomationModule vào đây
  ],
  exports: [
    StandardInfomationModule  // Nếu bạn cần export ra ngoài để sử dụng ở module khác
  ]
})
export class StandardModule {}

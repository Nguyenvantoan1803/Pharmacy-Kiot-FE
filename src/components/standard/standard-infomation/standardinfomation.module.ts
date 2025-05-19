import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from "@angular/router";
import { StandardUserComponent } from './standard-user/standard-user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
const routes: Routes = [
    {
        path: "user",
        component: StandardUserComponent,
      },
]
@NgModule({
  declarations: [
    
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    
  ],
  exports: [
    
  ]
})
export class StandardInfomationModule {}

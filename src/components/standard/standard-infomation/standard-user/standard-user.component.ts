import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-standard-user',
  imports: [CommonModule,NgxDatatableModule],
  templateUrl: './standard-user.component.html',
  styleUrls: ["./standard-user.component.scss"]
})
export class StandardUserComponent {
  ColumnMode = ColumnMode;
  listInventory: any[] = [];
  listSelected: any[] = [];
  totalCount = 0;
  isShowSpinner = false;

  ngOnInit() {
    this.generateFakeData();
  }

  generateFakeData() {
    this.listInventory = Array.from({ length: 11 }).map((_, i) => ({
      id: i + 1,
      name: `Sản phẩm ${i + 1}`,
      quantity: Math.floor(Math.random() * 11),
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10)
    }));
    this.totalCount = this.listInventory.length;
  }

  onSelect(event: any) {
    this.listSelected = event.selected;
    console.log('Selected:', this.listSelected);
  }
}

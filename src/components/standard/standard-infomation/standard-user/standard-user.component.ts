import { Component } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectionType } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-standard-user',
  imports: [NgxDatatableModule,CommonModule],
  templateUrl: './standard-user.component.html',
  styleUrl: './standard-user.component.scss'
})
export class StandardUserComponent {
  SelectionType = SelectionType;
  ColumnMode = ColumnMode;
  listInventory: any[] = [];
  listSelected: any[] = [];
  totalCount = 0;
  isShowSpinner = false;

  ngOnInit() {
    this.generateFakeData();
  }

  generateFakeData() {
    this.listInventory = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: `Sản phẩm ${i + 1}`,
      quantity: Math.floor(Math.random() * 10),
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10)
    }));
    this.totalCount = this.listInventory.length;
  }

  onSelect(event: any) {
    this.listSelected = event.selected;
    console.log('Selected:', this.listSelected);
  }
}

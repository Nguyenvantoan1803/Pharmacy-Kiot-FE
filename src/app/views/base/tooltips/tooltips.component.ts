import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';

@Component({
    selector: 'app-tooltips',
    templateUrl: './tooltips.component.html',
    styleUrls: ['./tooltips.component.scss'],
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent]
})
export class TooltipsComponent {

  constructor() { }

}

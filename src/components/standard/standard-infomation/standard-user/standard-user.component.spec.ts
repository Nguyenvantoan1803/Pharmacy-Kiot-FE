import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardUserComponent } from './standard-user.component';

describe('StandardUserComponent', () => {
  let component: StandardUserComponent;
  let fixture: ComponentFixture<StandardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

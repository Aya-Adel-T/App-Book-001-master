import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePendingAuthorComponent } from './approve-pending-author.component';

describe('ApprovePendingAuthorComponent', () => {
  let component: ApprovePendingAuthorComponent;
  let fixture: ComponentFixture<ApprovePendingAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovePendingAuthorComponent]
    });
    fixture = TestBed.createComponent(ApprovePendingAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

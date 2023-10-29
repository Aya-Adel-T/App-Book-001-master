import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookInfoComponent } from './edit-book-info.component';

describe('EditBookInfoComponent', () => {
  let component: EditBookInfoComponent;
  let fixture: ComponentFixture<EditBookInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookInfoComponent]
    });
    fixture = TestBed.createComponent(EditBookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMajorComponent } from './edit-major.component';

describe('EditMajorComponent', () => {
  let component: EditMajorComponent;
  let fixture: ComponentFixture<EditMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMajorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

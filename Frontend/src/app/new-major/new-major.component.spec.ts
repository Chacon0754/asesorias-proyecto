import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMajorComponent } from './new-major.component';

describe('NewMajorComponent', () => {
  let component: NewMajorComponent;
  let fixture: ComponentFixture<NewMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMajorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

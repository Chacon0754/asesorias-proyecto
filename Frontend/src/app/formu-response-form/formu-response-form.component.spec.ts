import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuResponseFormComponent } from './formu-response-form.component';

describe('FormuResponseFormComponent', () => {
  let component: FormuResponseFormComponent;
  let fixture: ComponentFixture<FormuResponseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormuResponseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormuResponseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

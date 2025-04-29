import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryRequestStudentComponent } from './advisory-request-student.component';

describe('AdvisoryRequestStudentComponent', () => {
  let component: AdvisoryRequestStudentComponent;
  let fixture: ComponentFixture<AdvisoryRequestStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvisoryRequestStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvisoryRequestStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

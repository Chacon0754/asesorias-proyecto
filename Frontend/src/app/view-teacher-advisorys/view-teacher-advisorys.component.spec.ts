import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherAdvisorysComponent } from './view-teacher-advisorys.component';

describe('ViewTeacherAdvisorysComponent', () => {
  let component: ViewTeacherAdvisorysComponent;
  let fixture: ComponentFixture<ViewTeacherAdvisorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTeacherAdvisorysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTeacherAdvisorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

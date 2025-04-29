import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumResponseFormComponent } from './forum-response-form.component';

describe('ForumResponseFormComponent', () => {
  let component: ForumResponseFormComponent;
  let fixture: ComponentFixture<ForumResponseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumResponseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumResponseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
